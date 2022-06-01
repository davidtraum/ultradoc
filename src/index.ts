import { parse } from "https://deno.land/std/flags/mod.ts";
import { DocumentCompiler } from "./compiler/DocumentCompiler.ts";
import { renderPDF } from "./renderer/PDFRenderer.ts";

interface CommandLineArguments {
    file?: string;
    out?: string;
    pdf?: boolean;
}

const args = parse(Deno.args) as CommandLineArguments;

const compiler = new DocumentCompiler();

function finish() {
    compiler.end();
    if(args.out) {
        Deno.writeTextFile(args.out, compiler.getDocumentContent());
        if(args.pdf) {
            renderPDF('index.html');
        }
    } else {
        console.log(compiler.getDocumentContent());
    }
}

if(args.file) {
    Deno.readTextFile(args.file).then(text => {
        for(const line of text.split("\n")) compiler.inputLine(line);
        finish();
    });
} else {
    while(true) {
        const promptIn = prompt();
        if(promptIn){
            compiler.inputLine(promptIn);
        } else {
            break;
        }
    }
    finish();
}



