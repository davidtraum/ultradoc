const puppeteer = require('puppeteer');

console.log(process.argv);
const input = process.argv[2];

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('file://' + input);
    await page.emulateMediaType('screen');
    await page.waitForTimeout(5000);
    await page.pdf({path: input + '.pdf',
                format: 'A4',
                printBackground: true,   
                margin: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }         
    });
    await browser.close();
})();