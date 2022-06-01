import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class ContentNode extends DocumentNode {

    public id = '';

    constructor(args: NodeArguments) {
        super(args);
        this.id = args.content;
    }

    static getAliases(): Array<string> {
        return ['content', 'id'];
    }

    getOpenTag(): string {
        return `<div id="${this.id}" class="content-link">`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}