# Tech Showcase | Spatial Portfolio

A cinematic, interactive personal technology showcase featuring a character hero and 3D hardware exploration. Created as part of an intermediate frontend internship task focusing on responsive design, modern layouts (Flexbox/Grid), and 3D integration.

## Features

- **Cursor-following hero animation**: Central visual anchor utilizing the provided MP4 asset.
- **Translucent responsive navigation**: Minimalist glassmorphism top navigation that maintains viewport focus.
- **Edge-based navigation controls**: Proximity-triggered edge arrows for discovering deeper spatial experiences.
- **Interactive 3D laptop**: Dedicated 3D lab area showcasing the laptop GLB with OrbitControls.
- **Interactive CPU/RAM models**: Split-scene layouts featuring 3D component previews mapped to respective edge controls.
- **Component information panels**: Informational details cleanly integrated alongside hardware models.
- **Pricing/configuration section**: Grid-based hardware overview representing different performance tiers.
- **Responsive layouts**: Fluidly adapting structures utilizing Flexbox and CSS Grid.

## Technologies

- **HTML5**: Semantic document structure.
- **CSS3**: Modern layouts using Flexbox and CSS Grid, responsive design without horizontal scrolling.
- **JavaScript (ES6)**: Vanilla DOM manipulation, edge-proximity calculations, and IntersectionObserver logic.
- **Three.js**: Lightweight 3D model initialization, lighting, rendering, and camera control loaded via ES modules.

## Project Structure

```
Task 4/
│
├── index.html        # Main semantic HTML structure
├── style.css         # Styling, Layouts (Grid/Flexbox), Media Queries
├── script.js         # Navigation logic, 3D WebGL renderer initialization
├── README.md         # Project documentation
│
└── assets/           # Original provided assets
    ├── profile.jpg
    ├── laptop.glb
    ├── ram.glb
    ├── cpu.glb
    └── hero_animationcursor.mp4
```

## Learning Outcomes

This project fulfills the Intermediate Task 1 outcomes:
- **Flexbox layout and alignment**: Extensively used in navigation, button groups, split scenes, and centering elements.
- **CSS Grid**: Utilized perfectly for the Feature Cards (`.cards-grid`) and Configuration & Pricing (`.pricing-grid`) sections.
- **Responsive breakpoints**: Breakpoints at `1024px` and `768px` effectively reconfigure Grid columns, modify split scenes into stacked views, and swap desktop navigation for a mobile toggle.
- **DOM interaction & Event listeners**: Custom logic handling the appearance of edge navigation triggers based on cursor proximity in the Hero section.
- **Avoiding horizontal overflow**: Deliberate structure ensuring `100vw` issues and massive objects are bounded securely within the CSS framework.
- **Basic 3D model integration**: IntersectionObserver is paired with `Three.js` (GLTFLoader, OrbitControls) to ensure 3D canvas instantiation only occurs when an element scrolls into view, optimizing browser performance.

## Responsive Design

The site has been designed responsively:
- **Desktop**: Expansive layouts (3-4 columns), full 3:1 split scenes, edge navigation enabled.
- **Tablet (1024px)**: Transition to 2-column grids, split scenes break down cleanly to full width.
- **Mobile (768px)**: Unified single-column flow, mobile hamburger menu, touch-friendly scaled layouts.

## How to Run

Because this project utilizes 3D GLB assets via ES modules (Three.js), modern browsers require it to run over a local web server to prevent CORS security errors.

1. Open a terminal in the `Task 4` directory.
2. Run a simple local HTTP server (for example, using Python):
   ```bash
   python -m http.server
   ```
3. Open `http://localhost:8000` in your web browser.

## Internship Task

This project was created specifically to fulfill the Intermediate Task 1 responsive service/business web page requirement. It satisfies the required structure (Hero, Features, Pricing, Footer) while adding a complex spatial interactive layer matching the "Ponytail Philosophy" guidelines.

## What I Would Improve

- Preload lower resolution textures or placeholders for the GLB models to create smoother initialization states.
- Incorporate GSAP or Framer Motion for more elaborate, chained entrance animations across the feature cards.
- Add touch-based swipe detectors on mobile devices to mimic the left/right/down edge navigation functionality.
