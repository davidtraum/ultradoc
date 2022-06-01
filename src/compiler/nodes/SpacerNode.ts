import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class SpacerNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        if(args.attributes['size'] === undefined) args.attributes['size'] = '1';
    }

    static getAliases(): Array<string> {
        return ['spacer', 'space'];
    }

    getOpenTag(): string {
        return `<div class="spacer" style="height: ${this.args.attributes.size}em; width: ${this.args.attributes.size}em"></div>`;
    }

    isVoid(): boolean {
        return true;
    }

    getCloseTag(): string {
        return '</div>';
    }

    postProcess(compiler: DocumentCompiler) {
    }
}