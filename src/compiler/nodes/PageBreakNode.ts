import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class PageBreakNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['newpage', 'pagebreak'];
    }

    getOpenTag(): string {
        return `<div class="page-break"></div>`;
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