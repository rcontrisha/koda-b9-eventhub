# EVENTHUB WEB

![](https://img.shields.io/badge/React-19.2.8-grey?style=for-the-badge&logo=react&logoColor=white&labelColor=087EA4)
![](https://img.shields.io/badge/Vite-8.2.0-grey?style=for-the-badge&logo=vite&logoColor=white&labelColor=646CFF)
![](https://img.shields.io/badge/Tailwind_CSS-4.3.3-grey?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=06B6D4)
![](https://img.shields.io/badge/Redux_Toolkit-2.12.0-grey?style=for-the-badge&logo=redux&logoColor=white&labelColor=764ABC)
![](https://img.shields.io/badge/Nginx-1.28.3-grey?style=for-the-badge&logo=nginx&logoColor=white&labelColor=009639)

A React-based event management web app built with Vite and Tailwind CSS. It provides the user interface for the [EventHub API](https://github.com/rcontrisha/backend-eventhub), a Go backend for creating, retrieving, and managing event-related data.

## Technologies
- **React 19.2.8** — A JavaScript library used to build the user interface from reusable components.
- **Vite 8.2.0** — A build tool used for the development server with fast HMR and for production builds.
- **Tailwind CSS 4.3.3** — A utility-first CSS framework used for styling.
- **Redux Toolkit & Redux Persist** — State management, with selected state persisted across page reloads.
- **React Router 8.3.0** — Client-side routing between pages.
- **React Hook Form** — Form handling and input management.
- **Chart.js (react-chartjs-2)** — Rendering charts for data visualization.
- **ESLint** — Linting to keep the codebase consistent.
- **Docker & Nginx 1.28.3** — Multi-stage image that builds the app with Node and serves the static files with Nginx.

## Features
- **Browse and manage events** — Interface for viewing and managing event data provided by the EventHub API.
- **Client-side routing** — Navigate between pages without full page reloads, with fallback to `index.html` for direct URL access.
- **Form handling** — Input forms built with React Hook Form.
- **Data visualization** — Charts to present event-related data.
- **Persistent state** — Redux state kept across reloads with Redux Persist.
- **Containerized delivery** — Multi-stage Docker build serving the production bundle with Nginx.

## Getting Started

### Prerequisites

Install the following tools before running the project:

- **Git**
- **Docker** (to run with Docker)
- **Node.js 24** and **npm** (to run in development mode)

The web app talks to the EventHub API, so run the backend first by following the instructions in the [backend repository](https://github.com/rcontrisha/backend-eventhub). By default the API is available at `http://localhost:8080`.

### Clone the repository

```bash
git clone https://github.com/rcontrisha/koda-b9-eventhub.git
cd koda-b9-eventhub
```

### Run with Docker

Build the image:

```bash
docker build -t eventhub-fe .
```

Start the container:

```bash
docker run --rm -p 3000:80 eventhub-fe
```

The web app is available at `http://localhost:3000`.

To use the prebuilt image from GitHub Container Registry instead:

```bash
docker pull ghcr.io/rcontrisha/koda-b9-eventhub:latest
docker run -d --name eventhub-fe -p 3000:80 ghcr.io/rcontrisha/koda-b9-eventhub:latest
```

To stop and remove the container, run:

```bash
docker stop eventhub-fe && docker rm eventhub-fe
```

### Run in development mode

Install the dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

The web app is available at `http://localhost:5173`.

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the project |

## License

Distributed under the MIT License. See [License](/LICENSE) for more information.