import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class ListNode extends DocumentNode {

    private listType = 'ul';

    constructor(args: NodeArguments) {
        super(args);
        this.listType = args.attributes['ordered'] ? 'ol' : 'ul';
    }

    static getAliases(): Array<string> {
        return ['list', 'l'];
    }

    getOpenTag(): string {
        return `<${this.listType} ${this.getDefaultTagAttributes()}>`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</${this.listType}>`;
    }

    postProcess(compiler: DocumentCompiler) {}
}