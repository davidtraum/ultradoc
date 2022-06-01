import { parse } from "https://deno.land/std/flags/mod.ts";
import { DocumentCompiler } from "./compiler/DocumentCompiler.ts";
import { renderPDF } from "./renderer/PDFRenderer.ts";

interface CommandLineArguments {
    in?: string;
    out?: string;
    pdf?: boolean;
}

const args = parse(Deno.args) as CommandLineArguments;

const compiler = new DocumentCompiler();

function finish() {
    compiler.end();
    console.log("Processed", compiler.stats.nodesProcessed, "nodes.");
    if(args.out) {
        console.log("Writing", args.out);
        Deno.writeTextFileSync(args.out, compiler.getDocumentContent());
        if(args.pdf) {
            renderPDF('index.html');
        }
    } else {
        console.log(compiler.getDocumentContent());
    }
    console.log("Finished.");
    for(const error of compiler.errors) {
        console.log("Error:", error);
    }
}

if(args.in) {
    console.log("Compiling", args.in);
    Deno.readTextFile(args.in).then(text => {
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



