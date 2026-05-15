import os, re
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# The original block from <ul class="navbar-menu"> up to the Contact button.
# We want to replace it.
for f in html_files:
    content = open(f, encoding='utf-8').read()
    
    # We find where navbar-menu starts and the navbar-toggle starts
    # so we can completely rewrite the menu
    match = re.search(r'<ul class="navbar-menu">.*?</button>\s*</li>\s*<li><a href="contact\.html" class="navbar-cta">Contact</a></li>\s*</ul>', content, re.DOTALL)
    
    if match:
        original = match.group(0)
        
        replacement = """<ul class="navbar-menu">
                <li><a href="index.html" class="navbar-link">Home</a></li>
                <li><a href="about.html" class="navbar-link">About Us</a></li>
                <li><a href="academics.html" class="navbar-link">Academics</a></li>
                <li><a href="admissions.html" class="navbar-link">Admissions</a></li>
                <li><a href="faculty.html" class="navbar-link">Faculty</a></li>
                <li><a href="facilities.html" class="navbar-link">Facilities</a></li>
                <li><a href="disclosure.html" class="navbar-link">Mandatory Public Disclosure</a></li>
                <li><a href="gallery.html" class="navbar-link">Gallery</a></li>
            </ul>
            
            <div class="navbar-controls hidden-mobile">
                <button class="theme-switch" id="theme-toggle" aria-label="Toggle theme">
                    <div class="theme-switch-track">
                        <div class="theme-switch-handle">
                            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        </div>
                    </div>
                </button>
                <a href="contact.html" class="navbar-cta">Contact</a>
            </div>"""
            
        content = content.replace(original, replacement)
        open(f, 'w', encoding='utf-8').write(content)
        print(f"Updated {f}")
