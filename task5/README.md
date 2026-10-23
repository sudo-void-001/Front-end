# VENA VIDI VICI - Task Manager

A clean, responsive, and intuitive browser-based Task Manager inspired by Trello's visual hierarchy and principles.

## Features

- **Add tasks:** Quickly input new items to your list.
- **Three task states:** Cycle tasks through **TODO**, **IN PROGRESS**, and **COMPLETED** states.
- **Delete tasks:** Remove items you no longer need.
- **localStorage persistence:** Your tasks remain saved even after refreshing or closing the browser (includes automatic data migration from older versions).
- **Responsive Trello-inspired board UI:** Adapts seamlessly to desktop, tablet, and mobile screens with a multi-column visual organization.

## Technologies

- HTML
- CSS
- JavaScript
- Browser `localStorage`

## Project Structure

```text
task5/
│
├── index.html     # Structural markup and templates
├── style.css      # Styling, layout, and responsive design
├── script.js      # App logic, DOM manipulation, state management
└── README.md      # Project documentation
```

## How It Works

1. **DOM Manipulation:** The application uses an HTML `<template>` element to dynamically construct and insert task cards into the three-column board based on their current status.
2. **State Management:** The task list is maintained in a central JavaScript array (`tasks`). Cycling a task status moves it automatically between lists on the next render and visually updates the item.
3. **Client-side Persistence:** On every state change, the tasks array is serialized into JSON and stored in the browser's `localStorage`.
4. **Event Listeners:** The app uses JavaScript `addEventListener` to handle user interactions cleanly.

## Learning Outcomes

This project demonstrates:
- DOM manipulation and element creation dynamically.
- Client-side state management with JavaScript.
- Event listeners and interactive UI.
- Task-state handling and backward-compatible data migration.
- `localStorage` usage for simple data persistence.
- Responsive CSS patterns without external frameworks.

## How to Run

1. Open the `task5` folder.
2. Open `index.html` in any modern web browser.
3. No server setup or build step is required.

---
**Internship Task**  
Intermediate Task 2 — Task Manager Web Page
