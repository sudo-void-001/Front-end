# KAIRO

**Product Catalog Web Experience**

## Overview

KAIRO is a carefully curated frontend catalog of modern desk, computing, and gaming accessories. It features a complete product listing and detail experience built entirely with vanilla JavaScript, emphasizing a clean, human-designed aesthetic and robust functional principles.

## Features

- **Dynamic Product Rendering**: All product data is stored in JavaScript and rendered dynamically onto the DOM.
- **Product Detail Page**: Uses URL parameters (`?id=...`) to route and render specific products seamlessly.
- **Search**: Case-insensitive filtering across product names, categories, descriptions, and tags.
- **Category Filtering**: Automatically generated category buttons that instantly filter the catalog.
- **Sorting**: Multi-option sorting (Price Low-High, Price High-Low, A-Z, Z-A).
- **Combined Filtering Pipeline**: Search, filter, and sort all work together flawlessly without overriding each other.
- **Cart Drawer**: A responsive, slide-out cart panel accessible from any page.
- **Quantity Management**: Ability to increase, decrease, or remove items entirely, with instantly updated subtotals.
- **localStorage Persistence**: The cart survives browser refreshes and tab closures.
- **Responsive Design**: Custom CSS Grid implementation mapping seamlessly across desktop (4-column), tablet (2-column), and mobile (1-column).
- **Accessible Interactions**: Keyboard-navigable structure, aria labels for screen readers, and clear focus states.

## Technologies

- HTML5 (Semantic Structure)
- CSS3 (Variables, Grid, Flexbox, Media Queries)
- Vanilla JavaScript (ES6+, DOM Manipulation)
- `localStorage` API

## User Flow

`Catalog -> Search / Filter / Sort -> Product Detail -> Add to Cart -> Cart`

## Project Structure

```text
kairo/
│
├── index.html           # Product listing & catalog page
├── product.html         # Dynamic product detail page
├── css/
│   └── style.css        # Shared styling, completely responsive, Ponytail philosophy
├── js/
│   ├── products.js      # Core product database (Array of Objects)
│   ├── storage.js       # localStorage helpers and utilities
│   ├── cart.js          # Cart state management, rendering, and interaction logic
│   ├── catalog.js       # Index page logic: search, filter, sort, grid rendering
│   └── product.js       # Detail page logic: parsing URL parameters and rendering details
└── README.md            # Project documentation
```

## Learning Outcomes

By completing this project, the following concepts are practically demonstrated:

- **DOM Manipulation**: Creating and injecting elements fragment-by-fragment for performance.
- **Data-Driven Rendering**: Separating data (state) from the UI view.
- **Advanced Filtering Pipeline**: Combining multiple state parameters (search query + category + sort order).
- **URL Query Parameters**: Using `URLSearchParams` to pass data between pure HTML pages.
- **State Management & `localStorage`**: Keeping data consistent across page reloads without a backend.
- **Responsive Layouts**: Utilizing CSS Grid for fluid structural changes without breaking components.
- **Clean Architecture**: Splitting JS responsibilities across specific semantic files rather than one giant script.

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. No build tools, local servers, or backend dependencies are required to view the core functionality (though a simple local server like `Live Server` in VSCode is recommended to avoid strict CORS policies on local `file://` protocols, depending on the browser).
