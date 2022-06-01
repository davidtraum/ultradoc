
const Styles = {
    default: `
        @media print {.page-break { page-break-before: always; }}
        html {
            font-family: Verdana;
        }
        .small {
            font-size: 0.8rem;
        }
        .large {
            font-size: 1.5rem;
        }
        .headline {
            font-size: 2rem;
        }
        .bold {
            font-weight: bold;
        }
        .italic {
            font-decoration: italic;
        }
        .underline {
            text-decoration: underline;
        }
        code {
            background-color: none;    
        }
        p.center {
            text-align: center;
        }
        p {
            padding: .2rem;
        }
        .hljs-ln-numbers {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        
            text-align: center;
            color: #ccc;
            border-right: 1px solid #CCC;
            vertical-align: top;
            padding-right: 5px !important;
        }
        .hljs-ln-code {
            padding-left: 1em !important;
        }
        .no-lines .hljs-ln-numbers {
            display: none;
        }
        th {
            border-bottom: 1px solid gray;

        }
        table td {
            padding: .2rem;
        }
        table.seperators tr td:not(:first-child) {
            border-left: 1px solid gray;
        }
        .line-highlight > *:nth-child(2n) {
            background-color: rgb(240,240,240);
        }
        table.line-highlight tr:nth-child(2n+1):not(:first-child) {
            background-color: rgb(240,240,240);
        }
        .center {
            margin-left: 50%;
            transform: translateX(-50%);
        }
        .shadow {
            filter: drop-shadow(0 0 0.2rem gray);
        }
        .round {
            border-radius: 50%;
        }
        .horizontal {
            display: flex;
        }
        .horizontal.expand {
            justify-content: space-evenly;
        }
        .right {
            text-align: right;
        }
        .horizontal .spacer {
            height: 0 !important;
        }
        * {
            position: relative;
        }
        .background {
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: cover;
        }
        .invert {
            filter: invert(1);
        }
        body {
            margin: 0;
            width: 210mm;
        }
        .content-link {
            display: none;
        }
        .toc-entry {
            border-bottom: 1px dotted gray;
        }
    `
}

export default Styles;