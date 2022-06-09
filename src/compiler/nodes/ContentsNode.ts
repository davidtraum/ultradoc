import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";
import { TextNode } from "./TextNode.ts";

export class ContentsNode extends DocumentNode {


    private toc = '';

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['contents', 'toc'];
    }

    getOpenTag(): string {
        return `<div ${this.getDefaultTagAttributes()}>${this.toc}</div>`;
    }

    isVoid(): boolean {
        return true;
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {
        this.toc = '';
        for(const entry of compiler.bodyContent) {
            if(entry instanceof TextNode) {
                if((entry.args.classes.includes('l') || entry.args.classes.includes('xl') || entry.args.classes.includes('xxl')) && entry.args.attributes['no-toc'] === undefined && entry.args.content.length > 0) {
                    this.toc += `<a href="#${entry.id}" class="toc-link"><div class="toc-entry ${entry.args.classes}">
                                    <div class="toc-title">${entry.args.content}</div>
                                    <div class="toc-page" data-target="${entry.id}"></div>    
                                </div></a>`;
                }
            }
        }
    }
}