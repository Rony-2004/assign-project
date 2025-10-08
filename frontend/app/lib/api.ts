import { Idea, ApiResponse } from '../types/api';

// Remove trailing slash to prevent double slashes in URLs
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getIdeas(): Promise<Idea[]> {
    const response = await this.request<Idea[]>('/ideas');
    return response.data;
  }

  async createIdea(title: string, description: string): Promise<Idea> {
    const response = await this.request<Idea>('/ideas', {
      method: 'POST',
      body: JSON.stringify({ 
        title: title.trim(),
        description: description.trim()
      }),
    });
    return response.data;
  }

  async upvoteIdea(id: string): Promise<Idea> {
    const response = await this.request<Idea>(`/ideas/${id}/upvote`, {
      method: 'PATCH',
      headers: {},
    });
    return response.data;
  }

  async updateIdea(id: string, title: string, description: string): Promise<Idea> {
    const response = await this.request<Idea>(`/ideas/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
    });
    return response.data;
  }

  async deleteIdea(id: string): Promise<void> {
    await this.request<null>(`/ideas/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();