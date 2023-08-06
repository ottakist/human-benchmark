# Human Benchmark TS

## Overview
 "Human Benchmark TS" is a web application inspired by the popular Human Benchmark website. Utilizing JavaScript/TypeScript, Tailwind CSS, and Firebase with Auth0, the project features a collection of brain performance tests and custom game logic. The main objective was to recreate the website's functionality and reverse-engineer the tests while adding unique ideas. Notably, the project includes user authentication with Auth0, user dashboards displaying average test results and activity, as well as a leaderboard showcasing users' positions among all test takers. The application offers an engaging experience and showcases the developer's proficiency in JavaScript/TypeScript and Firebase integration.

## Features
**Custom Tests**: Human Benchmark TS includes a collection of custom-designed tests that challenge different aspects of cognitive performance, such as reaction time, memory, and accuracy.
- **Test Reverse Engineering**: To create a similar experience to the original Human Benchmark website, I reverse-engineered some tests to ensure users' authenticity and familiarity.
- **User Authentication**: The application utilizes Firebase with Auth0 integration to provide user authentication and secure access to certain features.
- **User Dashboard**: I have implemented a user dashboard where users can view their average results across different tests and see their latest activity on the tests.
- **Leaderboard**: The application features a leaderboard that displays each user's position among all users for each test, encouraging healthy competition and motivation to improve. 

## Technologies Used
 - JavaScript/TypeScript (JS/TS)
- Tailwind CSS
- Firebase with Auth0 Integration 

## Project Structure
```
 human-benchmark
├─ .eslintrc.json
├─ .gitignore
├─ index.html
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  └─ vite.svg
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ AimChart.webp
│  │  ├─ react.svg
│  │  ├─ ReactionChart.webp
│  │  └─ SequenceChart.webp
│  ├─ common
│  │  ├─ dashTypes.ts
│  │  ├─ homeTypes.ts
│  │  ├─ navTypes.ts
│  │  ├─ sharedTypes.ts
│  │  └─ testTypes.ts
│  ├─ components
│  │  ├─ dash
│  │  │  ├─ DashActivity.tsx
│  │  │  ├─ DashStats.tsx
│  │  │  └─ DashUser.tsx
│  │  ├─ homepage
│  │  │  ├─ GameBtn.tsx
│  │  │  └─ GamesTable.tsx
│  │  ├─ index.ts
│  │  ├─ navigation
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ NavButton.tsx
│  │  │  └─ Sidebar.tsx
│  │  ├─ shared
│  │  │  ├─ Loading.tsx
│  │  │  └─ PageHero.tsx
│  │  └─ tests
│  │     ├─ Aim.tsx
│  │     ├─ DashChart.tsx
│  │     ├─ index.ts
│  │     ├─ Reaction.tsx
│  │     ├─ Sequence.tsx
│  │     ├─ TestAbout.tsx
│  │     └─ TestInfoSection.tsx
│  ├─ context.tsx
│  ├─ firebase
│  │  ├─ functions
│  │  │  ├─ calculateImprovement.ts
│  │  │  ├─ createUser.ts
│  │  │  ├─ getUserById.ts
│  │  │  ├─ getUsersRating.ts
│  │  │  └─ updateUserFields.ts
│  │  ├─ functions.ts
│  │  └─ init.ts
│  ├─ hooks
│  │  └─ useTimePassed.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ normalize.css
│  ├─ pages
│  │  ├─ Dashboard.tsx
│  │  ├─ Error.tsx
│  │  ├─ Home.tsx
│  │  ├─ LeaderBoard.tsx
│  │  ├─ PrivateRoute.tsx
│  │  └─ Test.tsx
│  ├─ utils
│  │  ├─ convertTime.ts
│  │  └─ games.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
