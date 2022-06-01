import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class ImageNode extends DocumentNode {


    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['image', 'img'];
    }

    getOpenTag(): string {
        return `<img ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return true;
    }

    getCloseTag(): string {
        return `</img>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}