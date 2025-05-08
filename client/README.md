# 🚀 Vite + React + TypeScript Project Setup Guide for Beginners

This guide will walk you through setting up and running this frontend project, even if you're completely new to development. Don't worry - we'll take it step by step!

## 📋 Prerequisites

Before you start, make sure you have these installed:

### For Windows:
1. [Node.js](https://nodejs.org/) (v18 or higher) - Download the LTS version
2. [Git](https://git-scm.com/download/win) - For version control
3. [PNPM](https://pnpm.io/installation) - After installing Node.js, run in Command Prompt:
   ```bash
   npm install -g pnpm
   ```

### For Mac:
1. [Node.js](https://nodejs.org/) (v18 or higher) - Download the LTS version
2. [Git](https://git-scm.com/download/mac) - Usually comes with Xcode tools
3. [PNPM](https://pnpm.io/installation) - After installing Node.js, run in Terminal:
   ```bash
   npm install -g pnpm
   ```

## 🛠️ Installation

1. **Clone the repository** (or download the ZIP):
   ```bash
   git clone [your-repository-url]
   cd [your-project-folder]
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   - Create a `.env` file in the root directory
   - Add your environment variables (ask a teammate for the required ones)

## 🏃 Running the Project

To start the development server:
```bash
pnpm dev
```

This will:
- Start the Vite development server
- Open the app in your default browser (usually at `http://localhost:5173`)
- Enable hot reloading (changes appear instantly)

## 🏗️ Project Structure Overview

### Key Technologies Used:
- **Vite**: Super fast build tool
- **TypeScript**: For type-safe code
- **ShadCN UI**: Beautiful, accessible components
- **Zod**: For form validation
- **React Query**: For smart data fetching and caching
- **React Router**: For page navigation
- **TailwindCsS** : For design and simplifying the css

### 📂 Important Files and Routes

#### Main Application Files:
- `main.tsx` - Entry point (don't put code here, unless being wrapped in a provider)
- `App.tsx` - Only contains route definitions (see below)
- `src/routes/` - All your page components live here

#### 🗺️ Current Routes:

1. **Public Routes** (no authentication needed):
   - `/` - Login page (`routes/(auth)/Login`)

2. **Protected Routes** (require login - `RootGuard`):
   - `/dashboard` - Main dashboard (`routes/(root)/Dashboard`)
   - `/shopping-list` - Shopping list page (`routes/(root)/ShoppingList`)

3. **Admin Routes** (require admin privileges - `AdminGuard`):
   - `/admin/user-management` - User management (`routes/(root)/Usermanagement`)
   - `/admin/stock-management` - Stock management (`routes/(root)/StockManagement`)

## 🔄 Adding New Routes in the Future

To add a new route:
1. Create a new component in `src/routes/`
2. Add it to `App.tsx` inside the appropriate guard:
   - Public routes: Directly in `<Routes>`
   - Protected routes: Inside `<RootGuard>`
   - Admin routes: Inside both `<RootGuard>` and `<AdminGuard>`

Example for a future "Settings" page:
```typescript
<Route element={<RootGuard />}>
  {/* ... existing routes ... */}
  <Route path="/settings" element={<Settings />} />
</Route>
```

## � Common Commands

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Locally preview production build
- `pnpm lint` - Check code for errors
- `pnpm format` - Format code automatically

## 🆘 Need Help?

If you get stuck:
1. Make sure all dependencies are installed (`pnpm install`)
2. Check for error messages in the terminal
3. Ask a teammate or check the documentation for:
   - [Vite](https://vitejs.dev/)
   - [React Router](https://reactrouter.com/)
   - [ShadCN UI](https://ui.shadcn.com/)
   - [React Query](https://tanstack.com/query/latest)

Happy coding! 🎉