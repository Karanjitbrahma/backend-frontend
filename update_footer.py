import os
import re

dir_path = '.'
files_updated = []

for root, dirs, files in os.walk(dir_path):
    if '.git' in dirs:
        dirs.remove('.git')
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            patterns = [
                r'<li>\s*<a href="index\.html">Home</a>\s*</li>\n?\s*',
                r'<li>\s*<a href="services\.html">Services</a>\s*</li>\n?\s*',
                r'<li>\s*<a href="reports\.html">Reports</a>\s*</li>\n?\s*',
                r'<li>\s*<a href="courses\.html">Courses</a>\s*</li>\n?\s*',
                r'<li>\s*<a href="blog\.html">Blog</a>\s*</li>\n?\s*',
            ]
            
            for p in patterns:
                new_content = re.sub(p, '', new_content, flags=re.IGNORECASE)
                
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_updated.append(file)

print('Updated files:', files_updated)
