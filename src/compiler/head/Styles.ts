
const Styles = {
    default: `
        @media print {
            .page-footer {
                border-bottom: none !important;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
        }
        @media screen {
            body {
                border-right: 1px dashed black;
            }
        }
        .page-box {
            position: absolute;
            z-index: -2;
            left: 0;
            width: 100%;
            background-color: white;
        }
        .icon {
            height: 1em;
            width: 1em;
            padding: 0;
            transform: translateY(20%);
        }
        .page-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed black;
        }
        .page-footer > .footer-content-container {
            margin-left: 1rem;
        }
        .page-number {
            width: 75px;
            height: 20px;
            background-color: rgb(240,240,240);
            clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
            display: flex;
            justify-content: center;
            position: absolute;
            bottom: 0;
            right: 0;
        }
        .page-number p {
            margin-top: auto;
            margin-bottom: auto;
            transform: translateX(-12px);
        }
        p {
            margin-top: .5em;
            margin-bottom: .5em;
        }
        .note {
            border-left: 1rem solid lightblue;
            background-color: rgb(240,240,240);
            margin-left: 1rem;
            margin-right: 1rem;
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
        .right {
            text-align: right;
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
        .border {
            border: 1px dashed gray;
            padding: 1rem;
        }
        .layout.horizontal > .center {
            margin-top: auto;
            margin-bottom: auto;
            transform: unset;
            margin-left: unset;
            margin-right: unset;
        }
        .layout.horizontal > .spacer {
            height: 0 !important;
        }
        .layout {
            display: flex;
            flex-direction: column;
        }
        .layout.horizontal {
            flex-direction: row;
        }
        ul,ol {
            margin: 0;
            padding: 0;
            padding-left: 1rem;
        }
        img {
            max-width: 100%;
        }
    `
}

export default Styles;