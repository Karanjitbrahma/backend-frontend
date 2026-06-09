const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('admin.html', 'utf-8');
const js = fs.readFileSync('assets/js/admin.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Mock prompt/alert/confirm
window.alert = console.log;
window.confirm = () => true;
window.prompt = () => "test";

const script = document.createElement("script");
script.textContent = js;
document.body.appendChild(script);

try {
    const AdminApp = window.AdminApp;
    AdminApp.data = AdminApp.getDefaultData();
    AdminApp.currentCmsKey = 'consultAcharya';
    
    // Simulate open add modal
    AdminApp.openAddModal();
    
    // Add field
    AdminApp.addCheckoutField();
    console.log("Fields before save:", AdminApp.editingFields);
    
    // Fill title
    document.getElementById('fmTitle').value = "Test Plan";
    document.getElementById('fmDesc').value = "Test Desc";
    
    // Simulate save
    AdminApp.saveItem({ preventDefault: () => {} });
    
    console.log("Data after save:", AdminApp.data.consultAcharya);
    
} catch (e) {
    console.error("Crash during saveItem:", e);
}
