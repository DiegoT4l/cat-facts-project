# Cat Facts App

A React application that displays cat facts paired with random user profiles, featuring infinite scroll pagination and real-time data fetching.

## 🚀 Technologies

- **React V.19** - UI Library
- **TypeScript** - Static type checking
- **TanStack Query (React Query)** - Data fetching and caching
- **TailwindCSS V.4** - Utility-first CSS framework
- **React Intersection Observer** - Infinite scroll functionality

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

### Components

- `App.tsx` - Main application component
- `Card.tsx` - Displays individual cat fact with user information
- `SkeletonCard.tsx` - Loading placeholder component
- `Error.tsx` - Error state component

### Custom Hooks

- `useCatFacts` - Manages cat facts data fetching with React Query
- `useInfiniteScroll` - Handles infinite scroll functionality

### Services

- `requests.ts` - API integration layer with external services

### Types

- `types.ts` - TypeScript type definitions for API responses and data structures

## 🔄 Data Flow

1. The application fetches data from two external APIs:

   - Cat Facts API (`https://catfact.ninja/facts`)
   - Random User API (`https://randomuser.me/api`)

2. Data fetching is managed through React Query, providing:

   - Automatic caching
   - Background updates
   - Error handling
   - Loading states

3. Infinite scroll implementation:
   - Uses Intersection Observer API
   - Loads new data when the user reaches the bottom
   - Shows loading indicators during data fetching

## 🎯 Features

- **Infinite Scroll**: Seamless loading of additional content
- **Skeleton Loading**: Smooth loading states with placeholder content
- **Error Handling**: Graceful error state management
- **Responsive Design**: Mobile-friendly layout
- **Type Safety**: Full TypeScript implementation
- **Data Caching**: Efficient data management with React Query

## 🔧 API Integration

### Cat Facts API

```typescript
// Endpoint: https://catfact.ninja/facts
// Parameters:
// - page: number (pagination)
// - limit: number (items per page)
```

### Random User API

```typescript
// Endpoint: https://randomuser.me/api
// Parameters:
// - results: number (number of users)
// - inc: string (included fields)
// - seed: string (consistent results)
```

## 💻 Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/        # React components
├── hooks/            # Custom React hooks
├── services/         # API integration
├── types/            # TypeScript definitions
├── App.tsx          # Main component
└── main.tsx         # Application entry
```

## 🔍 Performance Considerations

- **Data Caching**: React Query manages data caching to minimize API calls
- **Lazy Loading**: Content is loaded as needed through infinite scroll
- **Optimized Re-renders**: Components are structured to minimize unnecessary re-renders
- **Type Safety**: TypeScript ensures runtime safety and better developer experience

## 🛠️ Technical Decisions

1. **React Query over SWR/Custom Hooks**

   - Built-in caching mechanisms
   - Automatic background refetching
   - Better TypeScript support
   - Simplified infinite query handling

2. **Tailwind CSS over CSS-in-JS**

   - No runtime overhead
   - Faster development
   - Better performance
   - Consistent design system

3. **Custom Hook Abstraction**
   - Separates concerns
   - Reusable logic
   - Easier testing
   - Better maintainability
