import os
import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

loaders_nav_match = re.search(r'(<!-- Primary Entry Loader.*?)(?=<!-- Main Content -->)', index_content, re.DOTALL)
footer_match = re.search(r'(<!-- Footer -->.*?(?=<!-- Back to Top Button -->))', index_content, re.DOTALL)

if not loaders_nav_match or not footer_match:
    print("Could not find loaders/nav or footer in index.html")
    exit(1)

loaders_nav_content = loaders_nav_match.group(1)
footer_content = footer_match.group(1)

# Process all html files
for filename in os.listdir('.'):
    if filename.endswith('.html') and filename != 'index.html':
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace loaders and nav
        new_content = re.sub(r'<!-- Primary Entry Loader.*?<!-- Main Content -->', loaders_nav_content + '<!-- Main Content -->', content, flags=re.DOTALL)
        
        # Replace footer
        new_content = re.sub(r'<!-- Footer -->.*?</footer>', footer_content.strip(), new_content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
