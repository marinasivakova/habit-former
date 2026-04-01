# Habit Former

A habit-tracking web application built with **React + TypeScript + Vite** using modern frontend architecture (FSD), Zustand for state management, and modular SCSS.

---

## Tech Stack

- **React 19** – UI library
- **TypeScript** – type safety
- **Vite** – fast bundler and dev server
- **Zustand** – lightweight state management
- **modular SCSS** – scoped, maintainable styles
- **React Router v7** – navigation and routing
- **ESLint + Prettier** – code quality and formatting

---

## Project Structure (FSD)

src/
├─ app/ # App entry and routes
├─ pages/ # Feature pages (Home, HabitDetail, Auth)
├─ entities/ # Core domain entities (Habit, User, etc.)
├─ features/ # Modular features (habit tracking, stats, etc.)
├─ shared/ # Configs, utils, constants
└─ widgets/ # Reusable UI components

---

## Available Scripts

```bash
# Start dev server
npm run dev

# Build the project
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

```

⚠️ Due to dependency conflicts with ESLint plugins, install dependencies with:

npm install --legacy-peer-deps

or use script npm run install-deps

## Routing

The app uses React Router v7 with a centralized route dictionary (src/shared/config/routes.ts). Current pages:

Home / Dashboard – main app interface
Habit Detail – view and edit individual habits
Auth – login and signup

Add new routes by updating the ROUTES object and AppRoutes component.

## Styling

modular SCSS: each component/page has its own .module.scss for scoped styles.
Global variables and mixins live in src/shared/styles/.

## State Management

Zustand handles app state in a lightweight, scalable way.
Store modules follow the FSD structure under entities/ and features/.

## Linting

ESLint is configured for TypeScript + React + Hooks + Prettier.
Use VSCode ESLint plugin for real-time linting.
