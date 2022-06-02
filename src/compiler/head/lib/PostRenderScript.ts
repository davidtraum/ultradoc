const PostRenderScript = `
window.addEventListener('load', postRender);
async function waitTimeout(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function postRender() {
    const before = Date.now();
    const measureDiv = document.createElement('div');
    document.body.appendChild(measureDiv);
    measureDiv.style.height = window.udoc.pageSize.height + 'mm';
    const measureBounds = measureDiv.getBoundingClientRect();
    const pageHeight = measureBounds.height;
    const elements = document.querySelectorAll('body > *');
    let pageIndex = 0;
    const addTasks = [];
    let pageBreaks = document.querySelectorAll('.page-break');
    for(const pageBreak of pageBreaks) {
        pageBreak.classList.remove('page-break');
        const bounds = pageBreak.getBoundingClientRect();
        const remaining = pageHeight - (bounds.top % pageHeight);
        pageBreak.style.height = remaining + 'px';
    }
    for(const el of elements) {
        const bounds = el.getBoundingClientRect();
        if((bounds.top + bounds.height) - (pageIndex * pageHeight) > pageHeight) {
            el.dataset.top = bounds.top;
            const breaker = document.createElement('div');
            addTasks.push(() => {document.body.insertBefore(breaker, el)});
            breaker.classList.add('page-break');
            pageIndex++;
        }
    }
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
            document.querySelectorAll('.page-footer').forEach(footer => {
                footer.firstChild.appendChild(footerContent);
            });
        } else {
            const bounds = footerContent.getBoundingClientRect();
            const page = (bounds.top / pageHeight) | 0;
            document.querySelectorAll('.page-footer')[page].firstChild.appendChild(footerContent);
        }
    }
    document.body.style.height = (pageHeight * (pageIndex + 1) + pageIndex) + 'px';
    for(const addTask of addTasks) addTask();
    console.log("UltraDoc: Render processing finished. Pages:", pageIndex + 1, "Duration:", (Date.now() - before) + 'ms');
    document.body.style.opacity = 1;
    window.dispatchEvent(new CustomEvent('udoc_finished'));
}
`

export default PostRenderScript;