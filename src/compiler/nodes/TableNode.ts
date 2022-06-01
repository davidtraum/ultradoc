import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TableNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['table'];
    }

    getOpenTag(): string {
        return `<table ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</table>';
    }

    postProcess(compiler: DocumentCompiler) {}
}