

export class MarkdownConverter {

    private body: Array<string> = [];

    constructor() {

    }

    inputLine(line: string) {
        const trim = line.trim();
        if(trim.length > 0) {
            if(trim.startsWith('#')) {
                if(trim.startsWith('###')) {
                    this.body.push('#t {l} ' + trim.substring(3));
                } else if(trim.startsWith('##')) {
                    this.body.push('#t {xl} ' + trim.substring(2));
                } else {
                    this.body.push('#t {xxl} ' + trim.substring(1)):
                }
            } else {
                this.body.push('#t ' + trim);
            }
        }        
    }
}