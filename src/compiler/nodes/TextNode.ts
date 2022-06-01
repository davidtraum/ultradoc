import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TextNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['text', 't', 'p'];
    }

    getOpenTag(): string {
        return `<p ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</p>';
    }

    postProcess(compiler: DocumentCompiler) {}
}