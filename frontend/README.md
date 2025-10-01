# Idea Board Frontend

A modern, responsive Next.js frontend for the Idea Board application. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🌙 **Dark Mode Support**: Automatic dark/light mode based on system preference
- ⚡ **Real-time Updates**: Live polling for new ideas and upvotes
- 🎨 **Modern UI**: Clean, accessible interface with Tailwind CSS
- 🔄 **API Integration**: Seamlessly connects to backend API with fallback to mock data
- 📝 **Form Validation**: Character counting and input validation for ideas
- 🚀 **Performance Optimized**: Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks with custom hooks
- **HTTP Client**: Fetch API with error handling
- **Icons**: Unicode emojis for universal compatibility

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Project Structure

```
frontend/
├── app/
│   ├── app/                    # Idea Board app page
│   │   ├── components/         # App-specific components
│   │   │   ├── IdeaCard.tsx   # Individual idea display
│   │   │   └── IdeaForm.tsx   # Idea submission form
│   │   └── page.tsx           # Main app page
│   ├── components/            # Shared components
│   │   ├── Header.tsx         # Page header
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   ├── EmptyState.tsx     # Empty state component
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── hooks/                 # Custom React hooks
│   │   └── useIdeas.ts        # Ideas management hook
│   ├── lib/                   # Utility libraries
│   │   └── api.ts             # API client
│   ├── types/                 # TypeScript type definitions
│   │   └── api.ts             # API types
│   ├── utils/                 # Helper functions
│   │   └── helpers.ts         # Common utilities
│   ├── config/                # Configuration
│   │   └── index.ts           # App configuration
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── public/                    # Static assets
├── package.json
└── README.md
```

## Key Components

### Landing Page (`/`)
- Hero section with call-to-action
- Features showcase with 4 key benefits
- Responsive design with proper contrast ratios
- Navigation to the main app

### Idea Board App (`/app`)
- Real-time idea display with polling
- Anonymous idea submission (280 character limit)
- Upvoting system with optimistic updates
- Responsive grid layout
- Error handling and loading states

### Custom Hooks

#### `useIdeas`
Manages all idea-related state and operations:
- Fetching ideas from API (with mock fallback)
- Submitting new ideas
- Upvoting existing ideas
- Real-time polling for updates
- Error handling and loading states

## API Integration

The frontend is designed to work with the backend API but gracefully falls back to mock data when the API is unavailable:

- **GET /api/ideas** - Fetch all ideas
- **POST /api/ideas** - Submit new idea
- **POST /api/ideas/:id/upvote** - Upvote an idea

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly

## Performance

- Server-side rendering with Next.js
- Optimized images and assets
- Code splitting and lazy loading
- Efficient state management
- Minimal bundle size
