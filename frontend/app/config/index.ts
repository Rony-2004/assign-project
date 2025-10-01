export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },
  app: {
    name: 'Idea Board',
    description: 'Share ideas anonymously and vote on others',
    maxIdeaLength: 280,
    refreshInterval: 10000, // 10 seconds
  },
  features: {
    realTimeUpdates: true,
    darkMode: true,
  },
} as const;