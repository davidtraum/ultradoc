import PostRenderScript from "./lib/PostRenderScript.ts";
import Styles from "./Styles.ts";

export class DocumentHead {

    private readonly content = [
        '<head>'
    ]

    properties: {[key: string]: boolean | string} = {
        "title": "Document",
        "charset": "utf-8",
        "usesCode": false
    }

    private scripts: Array<string> = [
        PostRenderScript
    ];
    private styles: Array<string> = [];
    private raw: Array<string> = [];

    constructor() {
        
    }

    end() {
        this.content.push(`<title>${this.properties['title']}</title>`);
        this.content.push(`<meta charset="${this.properties.charset}">`);
        this.content.push(`<style>${Styles.default}`);
        for(const style of this.styles) this.content.push(style);
        this.content.push('</style>')
        for(const script of this.scripts) {
            this.content.push(`<script>${script}</script>`);
        }
        for(const raw of this.raw) {
            this.content.push(raw);
        }
        this.content.push('</head>');
    }

    hasProperty(key: string): boolean {
        return this.properties[key] !== undefined;
    }

    editProperty(key: string, value: string | boolean) {
        if(this.hasProperty(key)) this.properties[key] = value;
    }

    addScript(script: string) {
        this.scripts.push(script);
    }

    addStyle(style: string) {
        this.styles.push(style);
    }

    addRaw(text: string) {
        this.raw.push(text);
    }

    getHead(): string {
        return this.content.join('\n');
    }

    
}