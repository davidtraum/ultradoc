import { DocumentNode } from "./DocumentNode.ts";
import { DocumentHead } from "./head/DocumentHead.ts";
import { BackgroundNode } from "./nodes/BackgroundNode.ts";
import { CodeNode } from "./nodes/CodeNode.ts";
import { ContainerNode } from "./nodes/ContainerNode.ts";
import { ContentNode } from "./nodes/ContentNode.ts";
import { ContentsNode } from "./nodes/ContentsNode.ts";
import { HorizontalNode } from "./nodes/HorizontalNode.ts";
import { ImageNode } from "./nodes/ImageNode.ts";
import { ListItemNode } from "./nodes/ListItemNode.ts";
import { ListNode } from "./nodes/ListNode.ts";
import { PageBreakNode } from "./nodes/PageBreakNode.ts";
import { SpacerNode } from "./nodes/SpacerNode.ts";
import { TableCellNode } from "./nodes/TableCellNode.ts";
import { TableHeaderNode } from "./nodes/TableHeader.ts";
import { TableNode } from "./nodes/TableNode.ts";
import { TableRowNode } from "./nodes/TableRowNode.ts";
import { TextNode } from "./nodes/TextNode.ts";

export interface NodeArguments {
    type: string;
    classes: string;
    attributes: {[key: string]: string};
    content: string;
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
        HorizontalNode,
        SpacerNode,
        BackgroundNode,
        ContentsNode,
        ContentNode
    ]
    private readonly errors: Array<string> = [];
    private lineCount = 0;
    private indent = 0;
    private defaultIndent = 0;
    private currentIndent = 0;
    public readonly bodyContent: Array<string | DocumentNode> = [];
    private stack: Array<DocumentNode> = [];
    public head: DocumentHead = new DocumentHead();

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
            content
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
            case "import":
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
                    if(current >= end) break;
                    this.inputLine(line);
                }
                break;
            default:
                this.error(`Unknown action command: ${cmd}`);
                break;
        }
    }

    inputLine(line: string) {
        this.lineCount++;
        let trimmed = line.trim();
        if(trimmed.length > 0) {
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
                    if(args.content.length > 0) this.bodyContent.push(args.content);
                    this.stack.push(node);
                } else {
                    this.error('Unknown element: "' + args.type + '"');
                }
                this.currentIndent = lineIndent;
            } else if(trimmed[0] === '@') {
                this.processCommand(trimmed.substring(1));
            } else {
                this.bodyContent.push(line);
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
            if(el instanceof DocumentNode) {
                el.postProcess(this);
                this.bodyContent[this.bodyContent.indexOf(el)] = el.getOpenTag();
            }
        }
        this.head.end();
    }

    fillPlaceholders(text: string): string {
        while(text.includes('%%time')) text = text.replace('%%time', new Date().toLocaleTimeString());
        while(text.includes('%%date')) text = text.replace('%%date', new Date().toLocaleDateString());
        while(text.includes('%%os')) text = text.replace('%%os', Deno.build.os);
        return text;
    }


    getBodyContent(): string {
        return this.fillPlaceholders(this.bodyContent.join("\n"));
    }

    getDocumentContent(): string {
        return `<html>${this.head.getHead()}<body>${this.getBodyContent()}</body></html>`;
    }
}