
const Styles = {
    default: `
        @media print {
            .page-box {
                border-bottom: none !important;
            }
        }
        @media screen {
            html {
                border-right: 1px dashed black;
            }
        }
        .page-box {
            position: absolute;
            z-index: -2;
            left: 0;
            border-bottom: 1px solid black;
            width: 100%;
        }
        .page-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            display: flex;
            justify-content: center;
        }
        .page-number {
            font-size: 1.5rem;
            border-radius: 50%;
        }
        p.xs {
            font-size: 0.5rem;
        }
        p.s {
            font-size: 0.8rem;
        }
        p.l {
            font-size: 1.5rem;
        }
        p.xl {
            font-size: 2rem;
        }
        p.xxl {
            font-size: 3rem;
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
        .horizontal.expand-evenly {
            justify-content: space-evenly;
        }
        .horizontal.expand-max {
            justify-content: space-between;
        }
        .right {
            text-align: right;
        }
        .horizontal > .spacer {
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
            overflow-x: hidden;
            overflow-y: hidden;
            opacity: 0;
        }
        html {
            overflow-x: hidden;
        }
        body > * {
            padding-right: 1rem;
            padding-left: 1rem;
        }
        .content-link {
            display: none;
        }
        .toc-entry {
            border-bottom: 1px dotted gray;
            display: flex;
            justify-content: space-between;
        }
        .toc-entry.l {
            padding-left: 2rem;
        }
        .toc-entry.xl {
            padding-left: 1rem;
        }
        .toc-link {
            text-decoration: none;
            color: unset;
        }
        .line {
            height: 1px;
            width: 100%;
            margin-top: .5rem;
            margin-bottom: .5rem;
            background-color: gray;
        }
        .horizontal .line {
            height: 100%;
            width: 1px;
            margin-top: 0;
            margin-bottom: 0;
            margin-right: .5rem;
            margin-left: .5rem;
        }
        .border {
            border: 1px dashed gray;
            padding: 1rem;
        }
    `
}

export default Styles;