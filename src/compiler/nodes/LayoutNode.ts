import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class LayoutNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        args.classes += ' layout';
    }

    static getAliases(): Array<string> {
        return ['layout'];
    }

    getOpenTag(): string {
        return `<div ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}