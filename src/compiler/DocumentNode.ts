import { NodeArguments, DocumentCompiler } from "./DocumentCompiler.ts";

export abstract class DocumentNode {
    public args: NodeArguments;

    constructor(args: NodeArguments){
        this.args = args;
    };
 static getAliases(): Array<string> {return []};

 abstract getOpenTag(): string;
 abstract isVoid(): boolean;
 abstract getCloseTag(): string;
 abstract postProcess(compiler: DocumentCompiler): void;

 getDefaultTagAttributes(): string {
     let attrs = "";
     if(this.args.classes.length > 0) {
         attrs += `class="${this.args.classes}" `
     }
     if(Object.keys(this.args.attributes).length > 0) {
         for(const key of Object.keys(this.args.attributes)) {
             if(this.args.attributes[key] !== "true") {
                attrs += `${key}="${this.args.attributes[key]}" `;
             } else {
                 attrs += `${key} `;
             }
         }
     }
     return attrs.trim();
 }

}