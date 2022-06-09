import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class CodeNode extends DocumentNode {

    private content = '';

    constructor(args: NodeArguments) {
        super(args);
        if(args.attributes['lang']) {
            args.classes += ` language-${args.attributes['lang']}`;
        }
    }

    static getAliases(): Array<string> {
        return ['code'];
    }

    getOpenTag(): string {
        return `<pre><code ${this.getDefaultTagAttributes()}>${this.content}`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</code></pre>';
    }

    postProcess(compiler: DocumentCompiler) {
        if(!compiler.head.properties['usesCode']) {
            compiler.head.editProperty('usesCode', true);
            compiler.head.addRaw(`
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/styles/default.min.css">
                <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/highlight.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>
            `);
        }
        if(this.args.attributes.src) {
            const fileContent = Deno.readTextFileSync(this.args.attributes.src);
            this.content = fileContent;
        }
    }
}