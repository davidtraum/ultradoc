import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

import { Buffer } from "https://deno.land/std/io/mod.ts";


export class UMLNode extends DocumentNode {

    private src = '';
    private type = 'svg';

    constructor(args: NodeArguments) {
        super(args);
        args.classes += " uml-diagram";
        if(args.attributes.type) {
            this.type = args.attributes.type;
            if(this.type === 'txt') {
                args.classes += " fetch-content";
            }
        }
    }

    static getAliases(): Array<string> {
        return ['uml', 'diagram'];
    }


    getOpenTag(): string {
        if(this.type === 'txt') {
            return `<div ${this.getDefaultTagAttributes()}>`;
        } else {
            return `<img ${this.getDefaultTagAttributes()} src="${this.src}">`;
        }
    }

    isVoid(): boolean {
        return this.type !== 'txt';
    }

    getCloseTag(): string {
        return `</div>`;
    }

    postProcess(compiler: DocumentCompiler) {
        const fileSource = Deno.readTextFileSync(this.args.attributes.src);
        const encoded = fileSource.split("").map((c: string) => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
        this.args.attributes.src =  `http://www.plantuml.com/plantuml/${this.type}/~h${encoded}`;
    }
}