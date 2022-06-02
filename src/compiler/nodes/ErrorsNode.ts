import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class ErrorsNode extends DocumentNode {

    private errorContent = '';

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['errors', 'problems'];
    }

    getOpenTag(): string {
        return `<div style="${this.errorContent.length <= 0 ? 'display: none' : ''}" class="errors"><strong>Compile errors:</strong><ul>${this.errorContent}`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return `</ul></div>`;
    }

    postProcess(compiler: DocumentCompiler) {
        this.errorContent = '';
        for(const error of compiler.errors) {
            this.errorContent += `<li class="error-entry">${error}</li>`
        }
    }
}