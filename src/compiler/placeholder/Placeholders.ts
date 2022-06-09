import { DocumentCompiler } from "../DocumentCompiler.ts";

const Placeholders = {
    'branding': () => 'Built with <a href="https://github.com/davidtraum/ultradoc">UltraDoc</a>',
    'date': () => new Date().toLocaleDateString(),
    'time': () => new Date().toLocaleTimeString(),
    'title': (compiler: DocumentCompiler) => compiler.head.properties.title
}

export default Placeholders;