import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class LineNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['line'];
    }

    getOpenTag(): string {
        return `<div class="line"></div>`;
    }

    isVoid(): boolean {
        return true;
    }

    getCloseTag(): string {
        return '</div>';
    }

    postProcess(compiler: DocumentCompiler) {
    }
}