# 🏡 HomeVision Frontend Challenge

## 🔗 Try it Live

👉 [https://home-vision-coding.vercel.app](https://home-vision-coding.vercel.app)

---

## Overview

This project is a solution for the **HomeVision Frontend Take-Home Challenge**.
The task was to build a modern, responsive React application that:

- Fetches house data from a **flaky API**.
- Displays the results cleanly with **infinite scrolling**.
- Handles API errors gracefully to avoid breaking the UI.
- Is fully containerized for local development.
- Includes **unit tests** for all core functionality.

The app was built with scalability, developer experience, and dark mode UX in mind.

---

## ✨ Features

- 📦 **Infinite Scroll**: Loads additional houses as you scroll down.
- 🌙 **Dark Mode Support**: Toggle between light and dark themes, persisted in `localStorage`.
- 🧱 **Styled Components**: Theme-aware components built with clean and modular styles.
- 🗺️ **Map Integration**: Each house page includes a Mapbox preview, styled according to the active theme.
- 💬 **Contact Agent Form**: Basic form UI ready for future backend integration.

---

## 🧰 Tech Stack

- **React + TypeScript**
- **Styled Components**
- **React Router**
- **Mapbox GL JS**
- **Vite**
- **Docker** for development containerization

---

## 🚀 Running the Project

### ✅ Prerequisites

- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/) (for local non-Docker dev)

---

### 📦 Run with Docker (Recommended for Evaluation)

```bash
docker build -f Dockerfile.dev -t homevision-dev .
docker compose -f docker-compose.dev.yml up
```

Then access the app at:
👉 [http://localhost:5173](http://localhost:5173)

---

### 🧑‍💻 Run Locally Without Docker

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev
```

---

## 🧪 Running Tests

To run the test suite:

```bash
yarn test
```

---

## ⚙️ API Usage

The app consumes house listings from:

```
https://staging.homevision.co/api_project/houses
```

It handles pagination (`page`, `per_page`) and gracefully manages network failures or `non-200` responses via retries and local cache fallback.

---

## 💡 Notes

- The main API call includes proper error handling, retrying if needed.
- Dark mode automatically applies corresponding Mapbox style (`light-v11` vs `dark-v11`).
- The UI adapts responsively across breakpoints.
- Development is containerized and reproducible with a single command.

---

## 📌 Future Improvements

- Enable production Dockerfile and deployment workflow
- Integrate real form submission via backend
- Use Mock Service Worker (MSW) to simulate API responses at the network level. This would allow testing real behavior without tightly coupling to axios, and improve realism in tests

---

## 🧠 About This Challenge

This project was implemented as part of a **technical assessment** for a frontend engineer role at **HomeVision**.
