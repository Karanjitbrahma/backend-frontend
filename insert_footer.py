import os
import re

dir_path = '.'

footer_template = """    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo" style="color:#fff;font-size:24px;"><i class="fa-solid fa-om" style="color:var(--primary-light);"></i> Bhartiya <span style="color:var(--primary-light);">Sidhant</span></div>
                    <p>Preserving and promoting the authentic science of Vedic Astrology. Our mission is to bring the divine wisdom of Jyotish Shastra to every household for peace, prosperity, and spiritual growth.</p>
                    <div class="footer-social">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-telegram"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-title">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="{prefix}privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="{prefix}terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="{prefix}faq.html">FAQ</a></li>
                        <li><a href="{prefix}refund-policy.html">Refund Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-title">Services</h4>
                    <ul class="footer-links">
                        <li><a href="{prefix}services.html">All Services</a></li>
                        <li><a href="{prefix}consultation.html">Consultation</a></li>
                        <li><a href="{prefix}pooja.html">Book Pooja</a></li>
                        <li><a href="{prefix}store.html">Gemstones</a></li>
                        <li><a href="{prefix}services.html">Vastu Shastra</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-title">Contact Us</h4>
                    <ul class="footer-links">
                        <li><i class="fa-solid fa-envelope" style="color:var(--primary-light);margin-right:8px;"></i> info@bhartiyasidhant.com</li>
                        <li><i class="fa-solid fa-phone" style="color:var(--primary-light);margin-right:8px;"></i> +91 98765 43210</li>
                        <li><i class="fa-solid fa-location-dot" style="color:var(--primary-light);margin-right:8px;"></i> Kokrajhar, Bodoland, Assam</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Bhartiya Sidhant. All Rights Reserved. | <a href="{prefix}privacy-policy.html" style="color:var(--primary-light);">Privacy Policy</a> | <a href="{prefix}terms-conditions.html" style="color:var(--primary-light);">Terms & Conditions</a> | <a href="{prefix}refund-policy.html" style="color:var(--primary-light);">Refund Policy</a></p>
            </div>
        </div>
    </footer>"""

updated_files = []

for root, dirs, files in os.walk(dir_path):
    if '.git' in dirs:
        dirs.remove('.git')
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Determine prefix
            rel_dir = os.path.relpath(root, dir_path)
            if rel_dir == '.' or rel_dir == '':
                prefix = ''
            else:
                depth = len(rel_dir.split(os.sep))
                prefix = '../' * depth
                
            footer_html = footer_template.replace('{prefix}', prefix)
            
            # Use regex to find and replace the footer block
            new_content = re.sub(r'<footer\b[^>]*>.*?</footer>', footer_html, content, flags=re.DOTALL | re.IGNORECASE)
            
            # If a file does not have a footer, we could append it before </body>
            if new_content == content:
                if '</body>' in content:
                    new_content = content.replace('</body>', footer_html + '\n</body>')
                    
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                updated_files.append(path)

print(f"Updated {len(updated_files)} files.")
