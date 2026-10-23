# Personal Portfolio - Retro Edition 🕹️

A responsive, single-page personal portfolio website built as **Task 2** for the **SAN Web Technology Internship (Level 1 - Beginner)**. 

This project features a clean, soft retro-terminal aesthetic with a blue and white color palette, showcasing my skills, projects, and achievements.

## 🚀 Features

* **Soft Retro Theme**: A custom-designed CSS theme featuring VT323 pixel typography, hard block shadows, and a calming blue/white palette.
* **Fully Responsive**: Adapts perfectly to desktop, tablet, and mobile screens without horizontal scrolling issues.
* **Scroll Animations**: Sections reveal smoothly as the user scrolls down the page using the `IntersectionObserver` API.
* **Interactive Elements**: Buttons and project cards feature mechanical, tactile hover states.
* **Mobile Navigation**: Includes a functional, accessible hamburger menu for smaller screens.
* **Highly Optimized**: Built with an emphasis on raw efficiency, eliminating layout thrashing and utilizing GPU acceleration.

## 🛠️ Technologies Used

* **HTML5**: Semantic and accessible structure.
* **CSS3**: Flexbox, CSS Grid, CSS Variables, Media Queries, and GPU-accelerated transitions.
* **Vanilla JavaScript**: DOM manipulation and scroll observation without any heavy libraries or frameworks.

## 📚 Learning Outcomes

Building this project provided hands-on experience and reinforced the following concepts:

1. **Semantic HTML & Accessibility**: Structuring web pages correctly using `<header>`, `<main>`, `<section>`, and `<nav>` tags, along with implementing ARIA labels for screen readers.
2. **Advanced CSS Layouts**: Mastering `Flexbox` and `CSS Grid` to create flexible, responsive components like project cards and navigation bars.
3. **Responsive Web Design**: Using media queries to adapt layouts across different viewport sizes, ensuring a seamless mobile experience.
4. **Performance Optimization**: 
    * Eliminating render-blocking resources by deferring scripts.
    * Using `will-change: opacity, transform` to offload animations to the GPU for smooth 60fps rendering.
    * Replacing heavy `transition: all` declarations with specific properties to prevent layout repaints.
5. **Modern JavaScript APIs**: Utilizing the `IntersectionObserver` API to detect when elements enter the viewport for efficient, scroll-triggered animations.
6. **CSS Theming**: Managing design systems and color palettes efficiently using CSS Custom Properties (`:root` variables).

## 💻 Setup & Execution

Since this project uses plain HTML, CSS, and JavaScript, no complex build tools or servers are required.

1. Clone or download the repository.
2. Navigate to the `task 2` directory.
3. Open `index.html` directly in any modern web browser.

## 🧑‍💻 Author

**Rajesh Pattan**
* Cybersecurity × Frontend Developer
* [GitHub](https://github.com/sudo-void-001)
* [LinkedIn](https://www.linkedin.com/in/rajesh-pattan-45453b3b4)
