<p align="center">
  <img src="./apps/web/public/logo.png" alt="Project Screenshot" width="150">
  <h1 align="center">Pennywise</h1>
</p>

**PennyWise** is a modern, full-stack expense tracker application built using a monorepo architecture. It allows users to seamlessly log their daily expenses and track their financial habits through an intuitive, real-time analytics dashboard.

---

## 🚀 Tech Stack

The application leverages a robust and scalable tech stack:

*   **Monorepo Tooling:** [Turborepo](https://turbo.build)
*   **Package Manager & Runtime:** [Bun](https://bun.sh)
*   **Frontend:** React, TypeScript, TailwindCSS, shadcn/ui
*   **Backend:** Express, TypeScript, JWT Authentication
*   **Database & ORM:** PostgreSQL, Prisma ORM

---

## 🛠️ Features

*   **Secure Authentication:** JWT-based user signup and login.
*   **Expense Management:** Easily create, update, and delete expense logs.
*   **Interactive Dashboard:** Visualize spending habits and track budget data efficiently.
*   **Monorepo Architecture:** Single repository managing both the frontend and backend workspace seamlessly.

---

## 💻 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
*   [Bun](https://bun.sh) (Recommended runtime and package manager)
*   PostgreSQL database instance

### 1. Clone the Repository

```bash
git clone git@github.com:akshay-vonnue/pennywise.git
cd pennywise
```

### 2. Install Dependencies

Install all workspace dependencies using Bun:

```bash
bun i
```

### 3. Environment Variables Setup

You need to configure the environment variables for both the frontend (`web`) and backend (`api`) applications. 

Copy the example environment files:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

> **Note:** Open the newly created `.env` files and fill in your specific credentials (such as your database connection string and JWT secret).

### 4. Run the Application in Development Mode

Start the development server for both projects concurrently:

```bash
bun run dev
```

Once running, the application components will be available at:
*   **Backend API:** `http://localhost:3000`
*   **Frontend Web:** `http://localhost:5173`

---

## 📁 Repository Structure

```text
pennywise/
├── apps/
│   ├── api/          # Express backend service
│   └── web/          # React frontend application
├── packages/         # Shared configurations or packages (if applicable)
├── package.json
└── turbo.json        # Turborepo configuration
```
