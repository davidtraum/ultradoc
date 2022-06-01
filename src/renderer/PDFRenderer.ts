import puppeteer from "https://deno.land/x/puppeteer@14.1.1/mod.ts";

export async function renderPDF(htmlFile: string, format: string = "A4") {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com", {
            waitUntil: "networkidle2",
    });
    console.log("Rendering pdf...");
    await page.pdf({ path: htmlFile.replace('.html', '.pdf'), format: 'A4' });
    console.log("Done.");
    await browser.close();
    console.log("Browser closed")
}