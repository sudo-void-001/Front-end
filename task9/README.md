# LUMEN - Interactive Analytics Dashboard

## Overview
LUMEN is a sophisticated, data-focused product analytics dashboard designed to provide a clearer view of digital activity. This project serves as the Advanced Task 3 for the SAN WebTechnology Front-End Development Internship.

## Features
- **KPI dashboard**: Highlights primary metrics and percentage changes from the previous period.
- **Dynamic data table**: Displays daily aggregated metrics based on active filters and views.
- **Interactive filters**: Control the date range and regional segment of the data.
- **Data view switching**: Effortlessly transition between Overview, Acquisition, and Engagement datasets.
- **Two SVG charts**: A responsive trend line chart and a horizontal bar chart generated directly with DOM manipulation, with zero external charting libraries.
- **Table sorting**: Click on table headers to sort data ascending or descending.
- **Persistent density preference**: Toggle between Comfortable and Compact UI densities, saved seamlessly using `localStorage`.
- **Responsive design**: Adapts cleanly from 1440px desktop to 375px mobile viewports.
- **Accessible controls**: Semantic HTML and readable contrast applied throughout.

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- localStorage

## Data Flow
Dataset &rarr; View &rarr; Filters &rarr; KPIs &rarr; Charts &rarr; Table

## Learning Outcomes
This project demonstrates solid frontend engineering practices including:
- **DOM manipulation**: Creating and updating DOM elements efficiently without heavy frameworks.
- **Data-driven rendering**: Aggregating raw datasets and updating the UI accurately.
- **KPI calculation & filtering**: Executing client-side reductions and calculating relative deltas.
- **SVG visualization**: Building customized, responsive vector charts from raw data points.
- **Responsive dashboard layout**: Utilizing Flexbox, CSS Grid, and media queries for adaptable interfaces.
- **Reusable UI patterns**: Creating structured pipelines to avoid duplicated logic.
- **UI state management & localStorage**: Handling component state across interactions and maintaining user preferences between sessions.
- **Accessibility**: Ensuring keyboard-friendly navigation, correct labeling, and scalable typography.

## How to Run
This is a purely front-end application with no backend required.
1. Download or clone this repository folder.
2. Open `index.html` in any modern web browser.
3. Interact with the sidebar, filters, and density settings to explore the dashboard.

## Design Decisions
- **Editorial Palette**: Instead of relying on the common generic "dark SaaS dashboard" style, an editorial aesthetic featuring earthy colors (`#D06B3C`, `#365C55`, `#C49A3A`) on a warm canvas (`#F1EEE7`) creates a calmer, more readable data experience.
- **SVG over Charting Libraries**: To demonstrate deep understanding of DOM mapping and mathematics, charts are drawn dynamically using SVG paths, polylines, and rects, rather than dropping in a heavy package like Chart.js.
- **Density Preference**: Adhering to project requirements, the UI persists a straightforward layout preference (Density) rather than introducing unnecessary complexity like a full theme architecture. 
- **Predictable Data Pipeline**: The data flow relies on a functional `getFilteredData` and `aggregateData` chain, ensuring that the KPIs, Trend Chart, Source Chart, and Table always align perfectly.
