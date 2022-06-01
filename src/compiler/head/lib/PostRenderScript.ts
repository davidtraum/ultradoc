const PostRenderScript = `
window.addEventListener('load', postRender);
function postRender() {
    const measureDiv = document.createElement('div');
    document.body.appendChild(measureDiv);
    measureDiv.style.height = window.udocPageSize.height + 'mm';
    const measureBounds = measureDiv.getBoundingClientRect();
    const pageHeight = measureBounds.height;
    const pageBreaks = document.querySelectorAll('.page-break');
    for(const pageBreak of pageBreaks) {
        const bounds = pageBreak.getBoundingClientRect();
        const remaining = pageHeight - (bounds.top % pageHeight);
        pageBreak.style.height = remaining + 'px';
    }
    const elements = document.querySelectorAll('body > *');
    let pageIndex = 0;
    for(const el of elements) {
        const bounds = el.getBoundingClientRect();
        if((bounds.top + bounds.height) - (pageIndex * pageHeight) > pageHeight) {
            el.classList.add('page-break');
            pageIndex++;
        }
    }
    for(const el of document.querySelectorAll('.toc-page')) {
        const target = document.getElementById(el.dataset.target);
        const targetBounds = target.getBoundingClientRect();
        const targetPage = (((targetBounds.top) / pageHeight) + 1) | 0;
        el.innerHTML = targetPage;
    }
    for(let i = 0; i<pageIndex; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.classList.add('page-box');
        pageDiv.style.top = (i*pageHeight) + 'px';
        pageDiv.style.height = pageHeight + 'px';
        const pageFooter = document.createElement('div');
        pageFooter.classList.add('page-footer');
        const pageNumber = document.createElement('div');
        pageNumber.classList.add('page-number');
        pageFooter.appendChild(pageNumber);
        pageNumber.innerHTML = i + 1;
        pageDiv.appendChild(pageFooter);
        document.body.appendChild(pageDiv);
    }
    document.body.style.height = (pageHeight * (pageIndex + 1)) + 'px';
    console.log("UltraDoc: Post render processing finished. Pages: ", pageIndex + 1);
    document.body.style.opacity = 1;
}
`

export default PostRenderScript;