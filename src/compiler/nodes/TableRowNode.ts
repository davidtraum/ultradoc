import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TableRowNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['row', 'r'];
    }

    getOpenTag(): string {
        return `<tr ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</tr>';
    }

    postProcess(compiler: DocumentCompiler) {}
}