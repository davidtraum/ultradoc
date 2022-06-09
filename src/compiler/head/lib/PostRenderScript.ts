const PostRenderScript = `
console.log("UltraDoc: Loading document...");
const imageLoadingPromise = getImageLoadingPromise();
window.addEventListener('load', postRender);
function getImageLoadingPromise() {
    const promises = [];
    for(const el of document.querySelectorAll('img')) {
        promises.push(new Promise((resolve) => {
            el.onload = resolve;
        }));
    }
    return Promise.all(promises);
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function postRender() {
    document.body.scrollTo(0,0);
    await imageLoadingPromise;
    await wait(1000);
    console.log("UltraDoc: Starting rendering...");
    const before = Date.now();
    // - Highlighting code blocks
    if(udoc.usesCode) {
        for(const codeBlock of document.querySelectorAll('code')) {
            while(codeBlock.innerHTML.includes('<')) codeBlock.innerHTML = codeBlock.innerHTML.replace('<', '&lt;');
            while(codeBlock.innerHTML.includes('>')) codeBlock.innerHTML = codeBlock.innerHTML.replace('<', '&gt;');
        }
        hljs.highlightAll(); 
        hljs.initLineNumbersOnLoad();
    }

    // - Measuring page size
    const measureDiv = document.createElement('div');
    document.body.appendChild(measureDiv);
    measureDiv.style.height = window.udoc.pageSize.height + 'mm';
    const measureBounds = measureDiv.getBoundingClientRect();
    const pageHeight = measureBounds.height;
    document.body.removeChild(measureDiv);
    let pageIndex = 0;
    const addTasks = [];
    let pageBreaks = document.querySelectorAll('.page-break');
    let count = 0;
    for(const pageBreak of pageBreaks) {
        pageBreak.classList.remove('page-break');
        pageBreak.classList.add('manual-break');
        const bounds = pageBreak.getBoundingClientRect();
        const remaining = pageHeight - (bounds.top % pageHeight);
        pageBreak.style.height = remaining + 'px';
        count++;
    }

    for(const el of document.querySelectorAll('body > *')) {
        //if(el.classList.contains('.manual-break')) {
        //    pageIndex++;
        //    continue;
        //}
        const styles = getComputedStyle(el);
        if(styles.getPropertyValue('position') !== 'fixed' && styles.getPropertyValue('position') !== 'absolute') {
            const bounds = el.getBoundingClientRect();
            if((bounds.top + bounds.height) - (pageIndex * pageHeight) > pageHeight) {
                console.log("Automatic page break at:", el);
                const breaker = document.createElement('div');
                breaker.dataset.debug="autobreak";
                addTasks.push(() => {el.parentNode.insertBefore(breaker, el)});
                breaker.classList.add('page-break');
                pageIndex++;
            }
        }
    }
    console.log("Automatic page breaks inserted:", pageIndex);
    pageBreaks = document.querySelectorAll('.page-break');
    for(const pageBreak of pageBreaks) {
        const bounds = pageBreak.getBoundingClientRect();
        const remaining = pageHeight - (bounds.top % pageHeight);
        pageBreak.style.height = remaining + 'px';
    }
    for(const el of document.querySelectorAll('.toc-page')) {
        const target = document.getElementById(el.dataset.target);
        const targetBounds = target.getBoundingClientRect();
        const targetPage = (((targetBounds.top) / pageHeight) + 1) | 0;
        el.innerHTML = targetPage;
    }
    if(window.udoc.pageNumbers) {
        for(let i = 0; i<=pageIndex; i++) {
            if(!window.udoc.excludePageNumbers.includes(i+1)) {
                const pageDiv = document.createElement('div');
                pageDiv.classList.add('page-box');
                pageDiv.style.top = (i*pageHeight) + 'px';
                pageDiv.style.height = pageHeight + 'px';
                const pageFooter = document.createElement('div');
                pageFooter.classList.add('page-footer');
                const footerContent = document.createElement('div');
                footerContent.classList.add('footer-content-container');
                pageFooter.appendChild(footerContent);
                const pageNumber = document.createElement('div');
                pageNumber.classList.add('page-number');
                pageFooter.appendChild(pageNumber);
                pageNumber.innerHTML = '<p>' + (i+1) + '</p>';
                pageDiv.appendChild(pageFooter);
                document.body.appendChild(pageDiv);
            }
        }
    }
    for(const footerContent of document.querySelectorAll('.footer-content')) {
        if(footerContent.dataset.always) {
            let except = [];
            if(footerContent.dataset.except) {
                except = footerContent.dataset.except.split(",").map(el => parseInt(el.trim()));
            }
            let pageId = 1;
            document.querySelectorAll('.page-footer').forEach(footer => {
                if(!except.includes(pageId)) {
                    footer.firstChild.appendChild(footerContent.cloneNode(true));
                }
                pageId++;
            });
            footerContent.parentNode.removeChild(footerContent);
        } else {
            const bounds = footerContent.getBoundingClientRect();
            const page = (bounds.top / pageHeight) | 0;
            document.querySelectorAll('.page-footer')[page].firstChild.appendChild(footerContent);
        }
    }
    for(const el of document.querySelectorAll('.fetch-content')) {
        el.innerHTML = "Loading content...";
        fetch(el.attributes.src).then(response => {
            el.text().then(text => {
                el.innerHTML = text;
            });
        });
    }
    document.body.style.height = (pageHeight * (pageIndex + 1) + pageIndex) + 'px';
    for(const addTask of addTasks) addTask();
    console.log("UltraDoc: Render processing finished. Pages:", pageIndex + 1, "Duration:", (Date.now() - before) + 'ms');
    document.body.style.opacity = 1;
    window.dispatchEvent(new CustomEvent('udoc_finished'));
}
`

export default PostRenderScript;