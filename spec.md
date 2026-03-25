# Insite Architecture

## Current State
The website is a full React/Three.js architecture portfolio site with a neon cyber color scheme. It has:
- ThreeScene.tsx: floating abstract geometric meshes in the hero background, mouse-reactive
- HeroSection, ProjectsSection, JournalSection, AboutSection, ContactSection, Footer
- React Three Fiber + Three.js already installed

## Requested Changes (Diff)

### Add
- A new `ScrollBuilding3D` component: a 3D architectural building model built from Three.js primitives (boxes/cylinders for floors, windows, facade details), rendered in a fixed/sticky side panel or as a floating element that persists as the user scrolls
- Scroll-driven animation: the building slowly rotates and/or shifts position as the user scrolls down the page, using window scroll events mapped to Three.js rotation/translation
- The building should use the site's neon color palette (cyan wireframe/emissive accents)

### Modify
- App.tsx: embed the ScrollBuilding3D as a fixed overlay element so it appears across all sections while scrolling

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/ScrollBuilding3D.tsx` — a Canvas with a procedurally built 3D building (stacked box floors, window grids, rooftop features) that reads scroll progress and applies rotation.y and slight position drift
2. Use `useEffect` + `window.scroll` listener to track scroll progress (0–1), pass to the Three.js scene via a ref or zustand
3. Position it as a `fixed` element (right side, partially visible) so it persists across all page sections
4. In App.tsx, add `<ScrollBuilding3D />` outside the main sections
