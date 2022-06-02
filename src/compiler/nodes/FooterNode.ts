
import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class FooterNode extends DocumentNode {


    constructor(args: NodeArguments) {
        super(args);
        args.classes += ' footer-content';
    }

    static getAliases(): Array<string> {
        return ['footer'];
    }

    getOpenTag(): string {
        if(this.args.attributes.always) {
            return `<div ${this.getDefaultTagAttributes()} data-always="true">`;
        } else {
            return `<div ${this.getDefaultTagAttributes()}>`;
        }
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}