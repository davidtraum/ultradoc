import Graphics from "./Graphics.ts";
import PostRenderScript from "./lib/PostRenderScript.ts";
import PageSizes, { PageSizeInfo } from "./PageSize.ts";
import Styles from "./Styles.ts";

interface HeadProperties {
    title: string;
    charset: string;
    usesCode: boolean;
    googleFontList: Array<string>;
    globalFont: string;
    pageSize: PageSizeInfo;
    pageNumbers: boolean;
    excludePageNumbers: Array<number>;
}
export class DocumentHead {

    private readonly content = [
        '<head>'
    ]

    properties: HeadProperties= {
        title: "Document",
        charset: "utf-8",
        usesCode: false,
        googleFontList: [],
        globalFont: 'Verdana',
        pageSize: PageSizes.A4,
        pageNumbers: true,
        excludePageNumbers: []
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
        this.content.push(`html {font-family: ${this.properties.globalFont}; max-width: ${this.properties.pageSize.width}mm;}`);
        this.content.push(`.limit-page-size {max-width: ${this.properties.pageSize.width}mm; max-height: ${this.properties.pageSize.height}mm;}`);
        for(const font of this.properties.googleFontList) {
            this.content.push(`.${font} {font-family: ${font};}`);
        }
        this.content.push(Graphics);
        this.content.push('</style>')
        for(const script of this.scripts) {
            this.content.push(`<script>${script}</script>`);
        }
        this.content.push('<script>');
        this.content.push(`
            window.udoc = {
                pageSize: ${JSON.stringify(this.properties.pageSize)},
                pageNumbers: ${this.properties.pageNumbers},
                excludePageNumbers: ${JSON.stringify(this.properties.excludePageNumbers)}
            }
        `);
        this.content.push('</script>');
        for(const raw of this.raw) {
            this.content.push(raw);
        }
        this.content.push('</head>');
    }

    hasProperty(key: string): boolean {
        //@ts-ignore
        return this.properties[key] !== undefined;
    }

    editProperty(key: string, value: string | boolean) {
        //@ts-ignore
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