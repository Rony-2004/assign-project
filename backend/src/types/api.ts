import { z } from 'zod';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

// Request/Response Schemas
export const createIdeaSchema = z.object({
  title: z.string()
    .min(1, 'Idea title is required')
    .max(100, 'Idea title must be 100 characters or less')
    .trim(),
  description: z.string()
    .min(1, 'Idea description is required')
    .max(500, 'Idea description must be 500 characters or less')
    .trim(),
});

export const upvoteIdeaSchema = z.object({
  id: z.string().min(1, 'Invalid idea ID'),
});

export const getIdeasSchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 50),
  offset: z.string().optional().transform(val => val ? parseInt(val, 10) : 0),
  sortBy: z.enum(['created_at', 'upvotes']).optional().default('created_at'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Type exports
export type CreateIdeaRequest = z.infer<typeof createIdeaSchema>;
export type UpvoteIdeaRequest = z.infer<typeof upvoteIdeaSchema>;
export type GetIdeasQuery = z.infer<typeof getIdeasSchema>;

// Error Types
export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
}