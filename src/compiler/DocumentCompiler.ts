import { DocumentNode } from "./DocumentNode.ts";
import { DocumentHead } from "./head/DocumentHead.ts";
import PageSizes from "./head/PageSize.ts";
import { BackgroundNode } from "./nodes/BackgroundNode.ts";
import { BorderNode } from "./nodes/BorderNode.ts";
import { CodeNode } from "./nodes/CodeNode.ts";
import { ContainerNode } from "./nodes/ContainerNode.ts";
import { ContentNode } from "./nodes/ContentNode.ts";
import { ContentsNode } from "./nodes/ContentsNode.ts";
import { ErrorsNode } from "./nodes/ErrorsNode.ts";
import { FooterNode } from "./nodes/FooterNode.ts";
import { ImageNode } from "./nodes/ImageNode.ts";
import { LayoutNode } from "./nodes/LayoutNode.ts";
import { LineNode } from "./nodes/LineNode.ts";
import { ListItemNode } from "./nodes/ListItemNode.ts";
import { ListNode } from "./nodes/ListNode.ts";
import { PageBreakNode } from "./nodes/PageBreakNode.ts";
import { SpacerNode } from "./nodes/SpacerNode.ts";
import { TableCellNode } from "./nodes/TableCellNode.ts";
import { TableHeaderNode } from "./nodes/TableHeader.ts";
import { TableNode } from "./nodes/TableNode.ts";
import { TableRowNode } from "./nodes/TableRowNode.ts";
import { TextNode } from "./nodes/TextNode.ts";
import { TransformNode } from "./nodes/TransformNode.ts";
import { UMLNode } from "./nodes/UMLNode.ts";
import Placeholders from "./placeholder/Placeholders.ts";

export interface NodeArguments {
    type: string;
    classes: string;
    attributes: {[key: string]: string};
    content: string;
    processedContent: string;
}


export class DocumentCompiler {
    
    readonly nodes: { [key: string] : DocumentNode} = {};
    private readonly NODE_LIST = [
        TextNode,
        CodeNode,
        TableNode,
        TableRowNode,
        TableCellNode,
        PageBreakNode,
        ListNode,
        ListItemNode,
        TableHeaderNode,
        ContainerNode,
        ImageNode,
        SpacerNode,
        BackgroundNode,
        ContentsNode,
        ContentNode,
        TransformNode,
        LineNode,
        BorderNode,
        LayoutNode,
        ErrorsNode,
        FooterNode,
        UMLNode
    ]
    public readonly errors: Array<string> = [];
    private lineCount = 0;
    private indent = 0;
    private defaultIndent = 0;
    private currentIndent = 0;
    public readonly bodyContent: Array<string | DocumentNode> = [];
    private stack: Array<DocumentNode> = [];
    public head: DocumentHead = new DocumentHead();
    private readonly components: {[key: string]: string[]} = {};
    private iconService = 'ionic';
    private currentReadComponent?: string;
    private ignore = false;
    public stats = {
        nodesProcessed: 0
    };

    constructor() {
        for(const node of this.NODE_LIST) {
            for(const alias of node.getAliases()) {
                //@ts-ignore
                this.nodes[alias] = node;
            }
        }
    }

    error(msg: string) {
        this.errors.push(msg + ', line ' + this.lineCount);
    }

    autoType(input: string): boolean | string | number {
        if(input === 'true' || input === 'false') {
            return input === 'true';
        } else {
            if(input.includes('.')) {
                try {
                    return parseFloat(input);
                }catch(ex){}
            } else {
                try {
                    return parseInt(input);
                }catch(ex){}
            }
        }
        return input;
    }

    parseNodeArguments(line: string): NodeArguments {
        const split = line.split(" ").filter(el => el.length > 0);
        const type = split[0];
        let content =  line.replace(type, '');
        let attributes: {[key: string]: string} = {};
        if(line.includes("[") && line.includes("]")) {
            const attrString = line.substring(line.indexOf("[") + 1, line.indexOf("]")).trim();
            content = content.replace(line.substring(line.indexOf("["), line.indexOf("]") + 1), '');
            const attrSplit = attrString.split(",").map(el => el.trim());
            for(const entry of attrSplit) {
                const entrySplit = entry.split("=").map(el => el.trim());
                if(entrySplit.length > 1) {
                    attributes[entrySplit[0]] = entrySplit[1];
                } else {
                    attributes[entrySplit[0]] = "true";
                }
            }
        }
        let classes = "";
        if(line.includes("{") && line.includes("}")) {
            classes = line.substring(line.indexOf("{") + 1, line.indexOf("}")).trim().split(",").join(" ");
            content = content.replace(line.substring(line.indexOf("{"), line.indexOf("}") + 1), '');
        }
        content = content.trim();
        return {
            type,
            attributes,
            classes,
            content,
            processedContent: this.replaceIcons(content)
        };
    }

    processCommand(cmd: string) {
        const args = cmd.split(" ");
        let attributes: {[key: string]: string} = {};
        let content = cmd.replace(args[0],'').trim();
        if(cmd.includes("[") && cmd.includes("]")) {
            const attrString = cmd.substring(cmd.indexOf("[") + 1, cmd.indexOf("]")).trim();
            content = content.replace(cmd.substring(cmd.indexOf("["), cmd.indexOf("]") + 1), '');
            const attrSplit = attrString.split(",").map(el => el.trim());
            for(const entry of attrSplit) {
                const entrySplit = entry.split("=").map(el => el.trim());
                if(entrySplit.length > 1) {
                    attributes[entrySplit[0]] = entrySplit[1];
                } else {
                    attributes[entrySplit[0]] = "true";
                }
            }
        }
        content = content.trim();
        switch(args[0]) {
            case "include":
                const text = Deno.readTextFileSync(content);
                let skip = 0;
                let end = -1;
                let current = 0;
                if(attributes['from']) skip = parseInt(attributes['from']);
                if(attributes['to']) end = parseInt(attributes['to']);
                if(attributes['count']) end = skip + parseInt(attributes['count']);
                for(const line of text.split("\n")) {
                    current++;
                    if(current < skip) continue;
                    if(current >= end && end > 0) break;
                    this.inputLine(line);
                }
                break;
            case "font":
                switch(args[1]) {
                    case "require":
                        {
                            if(this.head.properties.googleFontList.length <= 0) {
                                this.head.addRaw(`
                                    <link rel="preconnect" href="https://fonts.googleapis.com">
                                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                                `);
                            }
                            const fontname = args.slice(2).join(" ");
                            if(!this.head.properties.googleFontList.includes(fontname)) {
                                this.head.properties.googleFontList.push(fontname);
                                this.head.addRaw(`<link href="https://fonts.googleapis.com/css2?family=${fontname}&display=swap" rel="stylesheet">`)
                            }
                            this.head.properties.globalFont = fontname;
                        }
                        break;
                    case "default":
                        {
                            const fontname = args.slice(2).join(" ");
                            this.head.properties.globalFont = args[2];
                        }
                        break;
                }
                break;
            case "page":
                switch(args[1]) {
                    case "size":
                        if(PageSizes[args[2]] !== undefined) {
                            this.head.properties.pageSize = PageSizes[args[2]];
                        }  else {
                            this.error('Invalid page format: ' + args[2]);
                        }
                        break;
                    case "numbers":
                        switch(args[2]) {
                            case "off":
                                this.head.properties.pageNumbers = false;
                                break;
                            case "exclude":
                                args[3].split(",").map(el => parseInt(el.trim())).forEach(el => this.head.properties.excludePageNumbers.push(el));
                                break;
                        }
                        break;
                }
                break;
            case "document":
                switch(args[1]) {
                    case "title":
                        this.head.properties.title = args.slice(2).join(" ");
                        break;
                }
                break;
            case "component":
                switch(args[1]) {
                    case "begin":
                        this.components[args[2]] = [];
                        this.currentReadComponent = args[2];
                        break;
                    case "end":
                        this.currentReadComponent = undefined;
                        break;
                }
                break;
            case "ignore":
                switch(args[1]) {
                    case "begin":
                        this.ignore = true;
                        break;
                    case "end":
                        this.ignore = false;
                        break;
                }
                break;
            case "icon":
                switch(args[1]) {
                    case "service":
                        this.iconService = args[2];
                        break; 
                }
                break;
            default:
                this.error(`Unknown action command: ${cmd}`);
                break;
        }
    }

    getIconTag(name: string, service: string): string {
        switch(service) {
            case 'ion':
            case 'ionic':
            case 'ionicons':
                return `<img class="icon" src="https://unpkg.com/ionicons@5.5.2/dist/svg/${name}.svg">`;
            case 'fa':
            case 'fontawesome':
                return `<img class="icon" src="	https://site-assets.fontawesome.com/releases/v6.1.1/svgs/solid/${name}.svg">`;
            default:
                this.error('Invalid icon service');
                return '';
        }
    }

    replaceIcons(text: string): string {
        while(text.includes('**') && text.indexOf('**') !== text.lastIndexOf('**')) {
            let subtext = text.substring(text.indexOf('**') + 2);
            const iconNameText = subtext.substring(0, subtext.indexOf('**'));
            let iconName = iconNameText;
            let service = this.iconService;
            if(iconName.includes(':')) {
                const split = iconName.split(':').map(el=>el.trim());
                service = split[0];
                iconName = split[1];
            }
            text = text.replace(`**${iconNameText}**`, this.getIconTag(iconName, service));
        }
        return text;
    }

    inputLine(line: string) {
        this.lineCount++;
        if(this.ignore) return;
        let trimmed = line.trim();
        if(trimmed.length > 0) {
            if(trimmed[0] !== '@' && this.currentReadComponent) {
                this.components[this.currentReadComponent].push(line);
                return;
            }
            if(trimmed[0] === '#') {
                const lineIndent = line.length - line.trimStart().length;
                if(lineIndent > 0 && this.defaultIndent <= 0) {
                    this.defaultIndent = lineIndent;
                }
                trimmed = trimmed.substring(1).trim();
                const args = this.parseNodeArguments(trimmed);
                if(this.nodes[args.type]) {
                    //@ts-ignore
                    const node = new this.nodes[args.type](args);
                    if(lineIndent <= this.currentIndent) {
                        for(let i = 0; i < (( (this.currentIndent - lineIndent) / this.defaultIndent ) | 0) + 1; i++ ) {
                            const removed = this.stack.pop();
                            if(removed && !removed.isVoid()) {
                                this.bodyContent.push(removed.getCloseTag());
                            }
                        }
                    }
                    this.bodyContent.push(node);
                    if(args.processedContent.length > 0) this.bodyContent.push(args.processedContent);
                    this.stack.push(node);
                } else if(this.components[args.type]){
                    for(let line of this.components[args.type]) {
                        for(const attr of Object.keys(args.attributes)) {
                            while(line.includes(`%%${attr}`)) line = line.replace(`%%${attr}`, args.attributes[attr]);
                        }
                        this.inputLine(' '.repeat(this.currentIndent) + line);
                    }
                } else {
                    this.error('Unknown element: "' + args.type + '"');
                }
                this.currentIndent = lineIndent;
            } else if(trimmed[0] === '@') {
                this.processCommand(trimmed.substring(1));
            } else {
                this.bodyContent.push(this.replaceIcons(line));
            }
        }
    }

    end() {
        while(this.stack.length > 0) {
            const removed = this.stack.pop();
            if(removed && !removed.isVoid()) {
                this.bodyContent.push(removed.getCloseTag());
            }
        }
        for(const el of this.bodyContent) {
            if(el instanceof ContentsNode) {
                el.postProcess(this);
                this.bodyContent[this.bodyContent.indexOf(el)] = el.getOpenTag();
                this.stats.nodesProcessed++;
            }           
        }
        for(const el of this.bodyContent) {
            if(el instanceof DocumentNode) {
                el.postProcess(this);
                this.bodyContent[this.bodyContent.indexOf(el)] = el.getOpenTag();
                this.stats.nodesProcessed++;
            }
        }
        this.head.end();
    }

    fillPlaceholders(text: string): string {
        for(const placeholder of Object.keys(Placeholders)) {
            while(text.includes(`%%${placeholder}`)) {
                //@ts-ignore
                text = text.replace(`%%${placeholder}`, Placeholders[placeholder](this));
            }
        }
        return text;
    }


    getBodyContent(): string {
        return this.fillPlaceholders(this.bodyContent.join("\n"));
    }

    getDocumentContent(): string {
        return `<!DOCTYPE html><html>${this.head.getHead()}<body>${this.getBodyContent()}</body></html>`;
    }
}