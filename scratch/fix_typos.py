import os

def fix_typos():
    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('border-bottom: var(--border-width) solid var(--color-border);\">>', 'border-bottom: var(--border-width) solid var(--color-border);\">')
            
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {filename}")

if __name__ == "__main__":
    fix_typos()
