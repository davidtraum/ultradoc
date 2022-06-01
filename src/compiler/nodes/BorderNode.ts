import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class BorderNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        args.classes += " border";
    }

    static getAliases(): Array<string> {
        return ['border'];
    }

    getStyleString(): string {
        let styles = '';
        if(this.args.attributes.width) {
            styles += `border-width: ${this.args.attributes.width}px;`;
        }
        if(this.args.attributes.color) {
            styles += `border-color: ${this.args.attributes.color}`;
        }
        if(this.args.attributes.type) {
            styles += `border-type: ${this.args.attributes.type}`;
        }
        return styles;
    }

    getOpenTag(): string {
        return `<div ${this.getDefaultTagAttributes()} style="${this.getStyleString()}">`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}