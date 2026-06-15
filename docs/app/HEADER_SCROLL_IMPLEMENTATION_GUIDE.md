# Header Scroll Behavior - Implementation Guide

## Overview
Implement a header that:
1. **Starts transparent/hidden** while hero section is visible
2. **Slides in with white background** on scroll down
3. **Changes text/logo color** from white → dark for contrast
4. **Smooth animation** (0.3s cubic-bezier)

---

## CSS IMPLEMENTATION

### Add to your stylesheet:

```css
/* ============================================
   HEADER SCROLL STATES
   ============================================ */

/* Hero State (Header Transparent) */
header.hero-transparent {
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: none;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

header.hero-transparent .logo,
header.hero-transparent .logo-text,
header.hero-transparent .logo-icon {
  color: white;
  filter: brightness(1.1); /* Slight glow for visibility on dark heroes */
}

header.hero-transparent .nav a,
header.hero-transparent .nav-link,
header.hero-transparent .menu-link {
  color: white;
  opacity: 0.95;
}

header.hero-transparent .menu-toggle,
header.hero-transparent .hamburger {
  color: white;
}

/* Scrolled State (Header Visible with White Background) */
header.scrolled {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

header.scrolled .logo,
header.scrolled .logo-text,
header.scrolled .logo-icon {
  color: #1a1a1a; /* Dark text on white */
}

header.scrolled .nav a,
header.scrolled .nav-link,
header.scrolled .menu-link {
  color: #1a1a1a;
  opacity: 1;
}

header.scrolled .menu-toggle,
header.scrolled .hamburger {
  color: #1a1a1a;
}

/* Slide Down Animation */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Smooth transition for logo-specific colors */
header .logo,
header .logo-text {
  transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

header .nav a,
header .nav-link {
  transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Mobile/Responsive */
@media (max-width: 768px) {
  header.scrolled {
    position: fixed;
    width: 100%;
  }
  
  header.hero-transparent {
    position: absolute;
  }
}
```

---

## JAVASCRIPT IMPLEMENTATION

### Option 1: Vanilla JavaScript (Recommended)

```javascript
// Header Scroll Behavior
(function() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero-section, [class*="hero"]');
  
  if (!header) return; // Exit if no header found
  
  // Get hero height (with fallback)
  function getHeroHeight() {
    if (hero) {
      return hero.offsetHeight;
    }
    return window.innerHeight; // Default to viewport height
  }
  
  let scrollThreshold = getHeroHeight() - 100; // Start showing when 100px before hero ends
  
  // Initial state
  function setInitialState() {
    const scrollTop = window.scrollY;
    if (scrollTop < scrollThreshold) {
      header.classList.add('hero-transparent');
      header.classList.remove('scrolled');
    } else {
      header.classList.remove('hero-transparent');
      header.classList.add('scrolled');
    }
  }
  
  // Handle scroll
  function handleScroll() {
    const scrollTop = window.scrollY;
    
    if (scrollTop < scrollThreshold) {
      // Still in hero area
      if (header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
        header.classList.add('hero-transparent');
      }
    } else {
      // Scrolled past hero
      if (header.classList.contains('hero-transparent')) {
        header.classList.remove('hero-transparent');
        header.classList.add('scrolled');
      }
    }
  }
  
  // Handle window resize (recalculate hero height)
  function handleResize() {
    scrollThreshold = getHeroHeight() - 100;
    setInitialState();
  }
  
  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  
  // Set initial state on load
  setInitialState();
})();
```

### Option 2: jQuery (If already using jQuery)

```javascript
(function($) {
  const $header = $('header');
  const $hero = $('.hero-section, [class*="hero"]');
  
  if ($header.length === 0) return;
  
  function getHeroHeight() {
    return $hero.length > 0 ? $hero.height() : $(window).height();
  }
  
  let scrollThreshold = getHeroHeight() - 100;
  
  function setInitialState() {
    const scrollTop = $(window).scrollTop();
    $header
      .toggleClass('hero-transparent', scrollTop < scrollThreshold)
      .toggleClass('scrolled', scrollTop >= scrollThreshold);
  }
  
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop < scrollThreshold) {
      $header.removeClass('scrolled').addClass('hero-transparent');
    } else {
      $header.removeClass('hero-transparent').addClass('scrolled');
    }
  });
  
  $(window).on('resize', function() {
    scrollThreshold = getHeroHeight() - 100;
    setInitialState();
  });
  
  setInitialState();
})(jQuery);
```

### Option 3: React Hooks (If using React)

```jsx
import { useEffect, useRef } from 'react';

export function Header() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    
    const getHeroHeight = () => {
      return heroRef.current?.offsetHeight || window.innerHeight;
    };
    
    let scrollThreshold = getHeroHeight() - 100;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      if (scrollTop < scrollThreshold) {
        header.classList.remove('scrolled');
        header.classList.add('hero-transparent');
      } else {
        header.classList.remove('hero-transparent');
        header.classList.add('scrolled');
      }
    };
    
    const handleResize = () => {
      scrollThreshold = getHeroHeight() - 100;
      handleScroll(); // Recalculate on resize
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <header ref={headerRef} className="hero-transparent">
      {/* Header content */}
    </header>
  );
}
```

---

## WORDPRESS INTEGRATION (If using WordPress)

### Add to functions.php:

```php
<?php
// Add header scroll script
function add_header_scroll_script() {
  wp_enqueue_script(
    'header-scroll',
    get_template_directory_uri() . '/js/header-scroll.js',
    array(),
    '1.0.0',
    true
  );
}
add_action('wp_enqueue_scripts', 'add_header_scroll_script');

// Add header body class for styling
function add_header_scroll_classes($classes) {
  $classes[] = 'has-header-scroll';
  return $classes;
}
add_filter('body_class', 'add_header_scroll_classes');
?>
```

### Create `/js/header-scroll.js` with vanilla JavaScript code from Option 1 above.

### Elementor-specific (If using Elementor):
1. Go to Elementor settings for the header
2. Add custom CSS class: `scroll-header-wrapper`
3. Update CSS to target: `header.scroll-header-wrapper.scrolled`

---

## TESTING CHECKLIST

### Desktop Testing
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Mobile Testing
- [ ] iPhone 12+ (Safari)
- [ ] iPhone 8 (Safari) - older device
- [ ] Samsung Galaxy (Chrome)
- [ ] Google Pixel (Chrome)
- [ ] iPad (landscape & portrait)

### Functionality Testing
- [ ] Header is transparent on initial load ✓
- [ ] Header slides in on first scroll down ✓
- [ ] Text color changes from white to dark ✓
- [ ] Animation is smooth (no jank) ✓
- [ ] Header stays visible when scrolling within content ✓
- [ ] Works on all pages with hero sections ✓
- [ ] No z-index conflicts with other elements ✓
- [ ] Logo is visible on hero (readable) ✓
- [ ] Menu items are readable on hero ✓

### Edge Cases
- [ ] Fast scrolling (momentum scroll on mobile)
- [ ] Scroll to top (header returns to transparent state)
- [ ] Page with no hero section (header shows normally)
- [ ] Sticky elements in hero (no overlap)
- [ ] Transparent hero background (ensure text visible)
- [ ] Very short hero section (< 100px)
- [ ] Very long hero section (full page)

### Performance Testing
- [ ] Scroll performance (60fps, no stuttering)
- [ ] CPU usage (monitor with DevTools)
- [ ] Memory usage (no leaks)
- [ ] Mobile performance (smooth on low-end devices)

---

## TROUBLESHOOTING

### Header Not Appearing on Scroll
**Problem:** Header stays transparent even after scrolling past hero.

**Solution:**
1. Check if `scrollThreshold` is calculated correctly
2. Verify hero element selector matches your HTML
3. Add console.log to debug: `console.log('scrollTop:', scrollTop, 'threshold:', scrollThreshold);`
4. Check z-index isn't being overridden

### Animation is Jittery
**Problem:** Header animation stutters or isn't smooth.

**Solution:**
1. Use `{ passive: true }` on scroll listener (already in code)
2. Reduce animation duration if very fast scroll
3. Use GPU acceleration: Add `transform: translate3d(0, 0, 0);` to header
4. Check for conflicting CSS transitions

### Text Not Visible on Hero
**Problem:** White text on light hero image is hard to read.

**Solution:**
1. Add text-shadow: `text-shadow: 0 2px 4px rgba(0,0,0,0.2);`
2. Add semi-transparent background: `background: rgba(0,0,0,0.3);`
3. Adjust hero image overlay opacity
4. Use darker hero images
5. Add `filter: brightness(1.1);` for light glow

### Header Flickering
**Problem:** Header classes toggle rapidly.

**Solution:**
1. Increase threshold offset: `getHeroHeight() - 200` instead of `-100`
2. Add debounce to scroll handler (optional)
3. Check for competing scroll listeners
4. Ensure no other scripts modify header classes

---

## OPTIONAL ENHANCEMENTS

### Add Scroll Direction Detection
Only show header on scroll up:

```javascript
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down - hide/fade
    header.style.opacity = '0.7';
  } else {
    // Scrolling up - show
    header.style.opacity = '1';
  }
  
  lastScrollTop = scrollTop;
});
```

### Add Fade Transition Instead of Slide
Replace `slideDown` animation with:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

header.scrolled {
  animation: fadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

### Add Sticky Position Alternative
If you prefer sticky positioning:

```css
header.scrolled {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

---

## BROWSER SUPPORT

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | ✓ Full | Smooth animations |
| Firefox 88+ | ✓ Full | Smooth animations |
| Safari 14+ | ✓ Full | Smooth animations |
| Edge 90+ | ✓ Full | Smooth animations |
| iOS Safari 14+ | ✓ Full | Smooth on newer devices |
| Android Chrome | ✓ Full | Smooth on newer devices |
| IE 11 | ✗ No | CSS animations won't work |

---

## PERFORMANCE OPTIMIZATION

### Reduce Repaints
Use CSS class changes instead of inline styles:
```javascript
// Good ✓
header.classList.add('scrolled');

// Avoid ✗
header.style.background = 'white';
header.style.transform = 'translateY(0)';
```

### Optimize Scroll Listener
Already implemented with `{ passive: true }`:
```javascript
window.addEventListener('scroll', handleScroll, { passive: true });
```

### Use requestAnimationFrame if Needed
For very high-traffic sites:
```javascript
let ticking = false;

function update() {
  const scrollTop = window.scrollY;
  // Update header classes
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(update);
    ticking = true;
  }
}, { passive: true });
```

---

## DEPLOYMENT NOTES

### Before Going Live
1. Test on staging environment (if available)
2. Get QA sign-off on all browsers
3. Document any customizations made
4. Back up current header code
5. Have rollback plan ready

### After Deployment
1. Monitor for scroll performance issues
2. Check analytics for bounce rate changes
3. Gather user feedback
4. Monitor console for errors
5. Track page load performance (Web Vitals)

### Rollback Plan
If issues occur:
1. Remove `hero-transparent` and `scrolled` classes from header
2. Revert to previous header CSS
3. Remove JavaScript scroll listener
4. Restore backup if needed

---

## SUMMARY

**Time to Implement:** 2-4 hours
**Complexity:** Low-Medium
**Browser Support:** 95%+ of modern browsers
**Performance Impact:** Minimal (optimized code)

**Quick Start:**
1. Copy CSS from "CSS Implementation" section
2. Copy JavaScript from "Vanilla JavaScript" section
3. Test on main pages
4. Deploy to production
5. Monitor for issues

---

**Questions or issues? Check the troubleshooting section or test with browser DevTools.**
