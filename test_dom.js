const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('report-detail.html', 'utf8');
const rzpJs = fs.readFileSync('assets/js/razorpay-pay.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
dom.window.eval(rzpJs);

setTimeout(() => {
    try {
        console.log("Button text:", dom.window.document.getElementById('rdWhatsappBtn').textContent);
        console.log("Clicking sdPayBtn...");
        dom.window.document.getElementById('rdWhatsappBtn').click();
        const modal = dom.window.document.getElementById('rzpOverlay');
        console.log("Modal exists?", !!modal);
        if (modal) console.log("Modal display style:", dom.window.getComputedStyle(modal).display);
    } catch (e) {
        console.error("Error during click:", e);
    }
}, 1000);
