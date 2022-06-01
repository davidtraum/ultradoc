const PostRenderScript = `
function postRender() {
    const measureDiv = document.createElement('div');
    document.body.appendChild(measureDiv);
    measureDiv.style.height = '297mm';
    const measureBounds = measureDiv.getBoundingClientRect();
    const pageHeight = measureBounds.height;
    console.log("Page height", pageHeight)
    const elements = document.querySelectorAll('body > *');
    let pageIndex = 0;
    for(const el of elements) {
        const bounds = el.getBoundingClientRect();
        if((bounds.top + bounds.height) - (pageIndex * pageHeight) > pageHeight) {
            el.classList.add('page-break');
            pageIndex++;
        }
    }
}
`

export default PostRenderScript;