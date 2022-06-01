
import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class BackgroundNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        args.classes += ' background';
    }

    static getAliases(): Array<string> {
        return ['background', 'back', 'bg'];
    }

    getOpenTag(): string {
        if(this.args.attributes.image) {
            return `<div ${this.getDefaultTagAttributes()} style="background-image: url(${this.args.attributes.image})">`;
        } else if(this.args.attributes.color) {
            return `<div ${this.getDefaultTagAttributes()} style="background-color: ${this.args.attributes.color}">`
        } else {
            return `<div ${this.getDefaultTagAttributes()}`;
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