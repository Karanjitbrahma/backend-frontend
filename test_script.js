const fs = require('fs');
const code = fs.readFileSync('assets/js/admin.js', 'utf-8');
const html = fs.readFileSync('admin.html', 'utf-8');
console.log("Button type:", html.match(/<button[^>]*onclick="AdminApp.addCheckoutField\(\)"[^>]*>/)[0]);
