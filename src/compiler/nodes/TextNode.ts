import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TextNode extends DocumentNode {

    private static idCount = 0;
    public id?: string;

    constructor(args: NodeArguments) {
        super(args);
        if(this.args.content) {
            this.id = 't' + (++TextNode.idCount);
        }
    }

    static getAliases(): Array<string> {
        return ['text', 't', 'p'];
    }

    getOpenTag(): string {
        if(this.id) {
            return `<p ${this.getDefaultTagAttributes()} id="${this.id}">`;
        } else {
            return `<p ${this.getDefaultTagAttributes()}>`;
        }
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</p>';
    }

    postProcess(compiler: DocumentCompiler) {}
}