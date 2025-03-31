# PMart Frontend

This is the frontend application for PMart, an e-commerce platform that i made to sell my tech services as  freelance. It is built with Next.js and modern React technologies.
This Project Is served by a Django Backend Server.

## Tech Stack

- Next.js 15.1.0
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Radix UI Components
- React Hook Form
- Zod for validation

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or pnpm package manager

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

The frontend application will be available at `http://localhost:3000`

## Project Structure

- `app/` - Next.js app directory containing pages and layouts
- `components/` - Reusable UI components
- `context/` - React context providers
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and shared code
- `public/` - Static assets
- `styles/` - Global styles and Tailwind configuration

## Features

- Modern, responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- State management with Redux Toolkit
- Form handling with React Hook Form
- UI components from Radix UI
- Theme support with next-themes
- API integration with Axios

## Development

- The application uses Next.js App Router
- Tailwind CSS for styling
- TypeScript for type safety
- ESLint for code linting
- Hot reloading for development

## Building for Production

```bash
npm run build
# or
pnpm build
```

To start the production server:
```bash
npm run start
# or
pnpm start
``` 
