export interface Idea {
  id: string;
  title: string;
  description: string;
  text?: string; // Computed property for backward compatibility
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface CreateIdeaRequest {
  title: string;
  description: string;
}

export interface UpvoteIdeaResponse {
  idea: Idea;
  upvotes: number;
}