# 🚀 QUICK REFERENCE GUIDE
## Bipin Chikkatti College Website

Fast reference for all premium features implemented.

---

## 🌓 DARK MODE

**Toggle Location:** Navbar (between Events and Contact)

**Keyboard:** Tab to toggle button → Enter/Space to activate

**Storage:** `localStorage.getItem('theme')` → `'light'` or `'dark'`

**CSS Attribute:** `<html data-theme="light|dark">`

**Transition Time:** 400ms

---

## 🎬 LOADERS

### First Website Entry:
- **Loader:** PRIMARY (Cinematic)
- **Duration:** 4 seconds
- **Location:** index.html only
- **Trigger:** First visit (sessionStorage check)

### Page Navigation:
- **Loader:** SECONDARY (Minimal)
- **Duration:** 0.3 seconds
- **Location:** All pages
- **Trigger:** Internal link clicks

### Direct Page Access:
- **Loader:** STANDARD (Fallback)
- **Duration:** 0.8 seconds
- **Location:** All non-index pages
- **Trigger:** Page load

---

## 🎨 ANIMATION CLASSES

### Scroll Reveals:
```html
<div class="reveal">Fade up</div>
<div class="reveal-left">Slide from left</div>
<div class="reveal-right">Slide from right</div>
<div class="reveal-scale">Scale up</div>
<div class="reveal-fade">Pure fade</div>
```

### Stagger Delays:
```html
<div class="reveal delay-100">First</div>
<div class="reveal delay-200">Second</div>
<div class="reveal delay-300">Third</div>
```

### Hover Effects:
```html
<div class="hover-lift">Elevate on hover</div>
<div class="hover-glow">Glow on hover</div>
<div class="hover-scale">Scale on hover</div>
<a class="hover-underline">Underline animation</a>
```

### Image Effects:
```html
<div class="image-zoom">
  <img src="..." alt="...">
</div>
```

---

## 🎯 TIMING REFERENCE

| Animation | Duration | Easing |
|-----------|----------|--------|
| Instant | 150ms | elegant |
| Fast | 300ms | elegant |
| Medium | 500ms | elegant |
| Slow | 700ms | editorial |
| Slower | 900ms | editorial |
| Cinematic | 1200ms | editorial |

---

## 📱 RESPONSIVE BREAKPOINTS

```css
Desktop:  > 1024px
Tablet:   768px - 1024px
Mobile:   < 768px
```

---

## 🎨 COLOR PALETTE

### Light Mode:
```css
Background: #FAF8F3 (Cream)
Text:       #2C2C2C (Charcoal)
Accent:     #C9A876 (Gold)
Border:     #E5E1D8
```

### Dark Mode:
```css
Background: #0F1419 (Deep Charcoal)
Text:       #E8E4D9 (Warm Ivory)
Accent:     #C9A876 (Antique Gold)
Border:     #2A2F38
```

---

## 🔧 JAVASCRIPT FUNCTIONS

```javascript
initDualLoaderSystem()    // Handles all loaders
initThemeToggle()         // Dark mode toggle
initEnhancedScrollReveal() // Scroll animations
initMagneticButtons()     // Cursor attraction
initImageParallax()       // Image hover effects
initNavbar()              // Navbar behavior
initBackToTop()           // Back to top button
initScrollProgress()      // Progress bar
```

---

## 📁 KEY FILES

### CSS:
- `css/animations.css` - All animations
- `css/dark-theme.css` - Dark mode
- `css/navigation.css` - Navbar + toggle
- `css/main.css` - Main imports

### JavaScript:
- `js/main.js` - All functionality

### HTML:
- `index.html` - Primary loader
- All pages - Secondary loader + toggle

---

## ✅ QUICK TEST

1. **Dark Mode:** Click navbar toggle → Theme switches
2. **First Entry:** Open index.html → 4s cinematic loader
3. **Navigation:** Click About → 0.3s transition loader
4. **Animations:** Scroll page → Elements reveal
5. **Hover:** Hover cards → Smooth elevation
6. **Mobile:** Open menu → Toggle visible

---

## 🐛 TROUBLESHOOTING

**Dark mode not persisting:**
- Check localStorage: `localStorage.getItem('theme')`
- Clear and retry: `localStorage.clear()`

**Primary loader repeating:**
- Check sessionStorage: `sessionStorage.getItem('hasVisitedWebsite')`
- Clear: `sessionStorage.clear()`

**Animations not triggering:**
- Check if `.active` class added
- Verify IntersectionObserver support
- Check console for errors

**Theme toggle not visible:**
- Check navbar HTML has toggle button
- Verify CSS loaded: `css/navigation.css`
- Check z-index conflicts

---

## 📞 DOCUMENTATION

**Full Guides:**
- `COMPLETE_IMPLEMENTATION_SUMMARY.md` - Everything
- `PREMIUM_ANIMATIONS_GUIDE.md` - Animations
- `NAVBAR_TOGGLE_AND_LOADERS_GUIDE.md` - Toggle & loaders
- `LOADER_SYSTEM_CORRECTED.md` - Loader behavior
- `CONTENT_EXPANSION_PLAN.md` - Content strategy

---

**Last Updated:** Current implementation
**Status:** ✅ Production Ready
**Version:** 1.0.0
