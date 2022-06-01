import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class HorizontalNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        args.classes += ' horizontal';
    }

    static getAliases(): Array<string> {
        return ['horizontal'];
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