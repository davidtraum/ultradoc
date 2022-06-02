import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class SpacerNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
        if(args.attributes['auto'] === undefined && args.attributes['size'] === undefined) args.attributes['size'] = '1';
    }

    static getAliases(): Array<string> {
        return ['spacer', 'space'];
    }

    getOpenTag(): string {
        if(this.args.attributes.auto) {
            return `<div class="spacer" style="flex-grow: 1;"></div>`;
        } else {
            return `<div class="spacer" style="height: ${this.args.attributes.size}px; width: ${this.args.attributes.size}px"></div>`;
        }
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