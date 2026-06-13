const fs = require('fs');
const html = fs.readFileSync('service-detail.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    fs.writeFileSync(`temp_script_${count}.js`, match[1]);
    try {
        require('child_process').execSync(`node -c temp_script_${count}.js`);
        console.log(`Script ${count} passed syntax check`);
    } catch (e) {
        console.error(`Script ${count} syntax error:`, e.stderr.toString() || e.stdout.toString());
    }
    count++;
}
