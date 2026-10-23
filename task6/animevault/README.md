# ANIMEVAULT

Interactive Anime Directory

## Overview
AnimeVault is an interactive web-based directory showcasing a curated collection of anime. It allows users to seamlessly browse, search, filter, and view detailed information about different anime titles without any page reloads. The design embraces the "Ponytail philosophy": Simple, Clean, Intentional, and Functional.

## Features
- **Dynamic anime directory**: Displays 12 carefully selected anime spanning various genres and formats.
- **JavaScript-rendered cards**: All anime cards are generated dynamically from a single JavaScript dataset.
- **Real-time Search**: Search by title or genre seamlessly as you type.
- **Category filtering**: Quickly isolate anime by specific genres (Action, Adventure, Fantasy, Sci-Fi, etc.).
- **Detail modal**: Click on any card to access a full-featured information panel displaying rich metadata like Japanese title, studio, status, and description.
- **Responsive UI**: Adjusts flawlessly across desktop, tablet, and mobile viewing environments.
- **Accessible**: Features semantic HTML, keyboard-accessible controls, and proper focus states.

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript

## Data Structure
All information is structured within a central JavaScript array (`animeData`). Each object encapsulates rich details about the anime: ID, titles, genres, category, year, status, format, episodes, rating, studio, creator, duration, description, and an image URL.

## How It Works
The application utilizes a single-page architecture built purely on frontend technologies:
- **JavaScript Array**: Acts as the single source of truth for all content.
- **Filtering/Search**: The `getFilteredAnime()` function continuously processes the data array against the current search string and selected category filter.
- **DOM Rendering**: Based on the filtered results, `renderAnime()` updates the DOM grid using dynamically created elements via `createAnimeCard()`.
- **Detail Modal**: Event listeners on each card trigger `openDetails()`, injecting the specific anime's rich metadata into the reusable modal structure.

## Learning Outcomes
- Advanced **DOM manipulation** and dynamic element rendering.
- Managing data using **JavaScript arrays and objects**.
- Implementing combined **Search/Filter logic** to create fluid user experiences.
- Event handling and **UI state management**.
- Designing a polished, **responsive layout** without external CSS frameworks.
- Building accessible **Modal interactions** in Vanilla JavaScript.

## How to Run
This project operates purely on the front-end. There is no backend, database, or API dependency.
1. Open the project folder.
2. Double-click the `index.html` file to open it in any modern web browser.
3. Alternatively, serve it via a local development server (like VS Code Live Server) for the best experience.
