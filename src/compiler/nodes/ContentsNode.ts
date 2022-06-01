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
        return `<div ${this.getDefaultTagAttributes()}>${this.toc}`;
    }

    isVoid(): boolean {
        return true;
    }

    getCloseTag(): string {
        return `</img>`;
    }

    postProcess(compiler: DocumentCompiler) {
        this.toc = '';
        for(const entry of compiler.bodyContent) {
            if(entry instanceof TextNode) {
                if(entry.args.classes.includes('headline') || entry.args.classes.includes('large') && entry.args.content.length > 0) {
                    this.toc += `<div class="toc-entry">${entry.args.content}</div>`;
                }
            }
        }
    }
}