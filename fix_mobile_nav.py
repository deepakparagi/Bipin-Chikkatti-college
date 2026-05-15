import os, re
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

pattern = re.compile(r'(<li><a href="gallery\.html" class="navbar-link">Gallery</a></li>\s*</ul>)')
replacement = r'<li><a href="gallery.html" class="navbar-link">Gallery</a></li>\n                <li class="mobile-only-nav" style="margin-top: 20px; width: 100%;"><a href="contact.html" class="navbar-cta" style="width: 100%;">Contact Us</a></li>\n            </ul>'

for f in html_files:
    content = open(f, encoding='utf-8').read()
    content = re.sub(pattern, replacement, content)
    open(f, 'w', encoding='utf-8').write(content)
print("Added mobile CTA")
