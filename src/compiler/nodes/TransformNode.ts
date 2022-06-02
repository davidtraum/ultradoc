import { NodeArguments, DocumentCompiler } from "../DocumentCompiler.ts";
import { DocumentNode } from "../DocumentNode.ts";

export class TransformNode extends DocumentNode {

    constructor(args: NodeArguments) {
        super(args);
    }

    static getAliases(): Array<string> {
        return ['transform'];
    }

    private getTransformStyles(): string {
        let styles = [];
        if(this.args.attributes.rotate) {
            styles.push(`rotate(${this.args.attributes.rotate}deg)`);
        }
        if(this.args.attributes.scale) {
            styles.push(`scale(${this.args.attributes.scale})`);
        }
        if(this.args.attributes.moveX) {
            styles.push(`translateX(${this.args.attributes.moveX}px)`);
        }
        if(this.args.attributes.moveY) {
            styles.push(`translateY(${this.args.attributes.moveY}px)`);
        }
        return styles.join(" ");
    }

    getOpenTag(): string {
        return `<div ${this.getDefaultTagAttributes()} style="transform: ${this.getTransformStyles()}">`;
    }

    isVoid(): boolean {
        return false;
    }

    getCloseTag(): string {
        return '</div>';
    }

    postProcess(compiler: DocumentCompiler) {}
}