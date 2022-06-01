import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class ListItemNode extends DocumentNode {


    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['item', 'i'];
    }

    getOpenTag(): string {
        return `<li ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</li>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}