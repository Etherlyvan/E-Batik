# Implementation Plan: Adding External Link to Navbar

## Overview
Add an external link to https://genbatik.ub.ac.id/ in the navbar, labeled as "GenBatik" in all three languages (Indonesian, English, Japanese).

## Implementation Details

### 1. Modify the navLinks array in Navbar.tsx
Add a new entry to the `navLinks` array (around line 32-51):

```typescript
const navLinks = [
  { 
    href: '/', 
    label: currentLanguage.code === 'id' ? 'Beranda' : 
           currentLanguage.code === 'en' ? 'Home' : 
           'ホーム'
  },
  { 
    href: '/gallery', 
    label: currentLanguage.code === 'id' ? 'Galeri' : 
           currentLanguage.code === 'en' ? 'Gallery' : 
           'ギャラリー'
  },
  { 
    href: '/museum', 
    label: currentLanguage.code === 'id' ? 'Museum 3D' : 
           currentLanguage.code === 'en' ? '3D Museum' : 
           '3Dミュージアム'
  },
  { 
    href: 'https://genbatik.ub.ac.id/', 
    label: 'GenBatik',
    isExternal: true
  },
];
```

### 2. Update the desktop navigation links rendering
Modify the link rendering section (around line 88-109) to handle external links:

```typescript
{navLinks.map(({ href, label, isExternal }) => {
  if (isExternal) {
    return (
      <a 
        key={href} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative group"
      >
        <span
          className="text-sm font-medium transition-colors duration-300 text-[#5a2b2b] hover:text-[#c4a484]"
        >
          {label}
        </span>
        <span
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#c4a484] transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
        />
      </a>
    );
  }
  
  return (
    <Link key={href} href={href} className="relative group">
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          isActive(href) 
            ? "text-[#5a2b2b]" 
            : "text-[#5a2b2b] hover:text-[#c4a484]"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "absolute -bottom-1 left-0 w-full h-0.5 bg-[#c4a484] transform origin-left transition-transform duration-300",
          isActive(href) 
            ? "scale-x-100" 
            : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
})}
```

### 3. Update the mobile navigation links rendering
Modify the mobile menu section (around line 199-213) to handle external links:

```typescript
{navLinks.map(({ href, label, isExternal }) => {
  if (isExternal) {
    return (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-3 py-2 rounded-md text-base font-medium text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5]"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </a>
    );
  }
  
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive(href)
          ? "text-[#5a2b2b] bg-[#c4a484]"
          : "text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5]"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );
})}
```

## Key Implementation Points

1. **External Link Handling**: Use `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"` for security
2. **Consistent Styling**: Maintain the same visual appearance as other nav items
3. **Mobile Compatibility**: Ensure the link works in both desktop and mobile views
4. **Hover Effects**: Preserve the hover underline animation for consistency
5. **Accessibility**: The link is properly semantic and accessible

## Testing Checklist

- [ ] Verify the link appears in the correct position in the navbar
- [ ] Confirm the link opens in a new tab
- [ ] Test on desktop view
- [ ] Test on mobile view
- [ ] Verify styling matches other nav items
- [ ] Check hover effects work properly
- [ ] Confirm mobile menu closes when link is clicked