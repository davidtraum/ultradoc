import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TableHeaderNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['header'];
    }

    getOpenTag(): string {
        return `<th ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</th>';
    }

    postProcess(compiler: DocumentCompiler) {}
}