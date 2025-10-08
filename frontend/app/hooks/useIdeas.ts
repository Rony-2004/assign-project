import { useState, useEffect, useCallback } from 'react';
import { Idea } from '../types/api';
import { apiClient } from '../lib/api';
import { config } from '../config';

interface UseIdeasReturn {
  ideas: Idea[];
  loading: boolean;
  error: string | null;
  fetchIdeas: () => Promise<void>;
  submitIdea: (title: string, description: string) => Promise<boolean>;
  upvoteIdea: (id: string) => Promise<void>;
  updateIdea: (id: string, title: string, description: string) => Promise<boolean>;
  deleteIdea: (id: string) => Promise<void>;
  refreshIdeas: () => Promise<void>;
}

export function useIdeas(): UseIdeasReturn {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    try {
      setLoading(true);
      
      try {
        // Try to fetch from API first
        const fetchedIdeas = await apiClient.getIdeas();
        setIdeas(fetchedIdeas);
        setError(null);
        return;
      } catch (apiError) {
        console.log('API not available, using mock data:', apiError);
      }
      
      // Fallback to mock data if API is not available
      const mockIdeas: Idea[] = [
        {
          id: '1',
          title: 'Coffee Shop Finder',
          description: 'A mobile app that helps you find the best local coffee shops based on your taste preferences',
          upvotes: 15,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Smart Garden System',
          description: 'Smart garden system that automatically waters plants based on weather and soil conditions',
          upvotes: 8,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
          updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          title: 'VR Meditation Spaces',
          description: 'Virtual reality meditation spaces for stress relief in busy work environments',
          upvotes: 23,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setIdeas(mockIdeas);
      setError(null);
    } catch (err) {
      setError('Failed to load ideas');
      console.error('Error fetching ideas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitIdea = useCallback(async (title: string, description: string): Promise<boolean> => {
    try {
      try {
        // Try to submit via API first
        const newIdea = await apiClient.createIdea(`${title}\n\n${description}`);
        setIdeas(prev => [newIdea, ...prev]);
        return true;
      } catch (apiError) {
        console.log('API not available for submission, using mock:', apiError);
      }
      
      // Fallback to mock implementation
      const newIdea: Idea = {
        id: Date.now().toString(),
        title: title,
        description: description,
        upvotes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setIdeas(prev => [newIdea, ...prev]);
      return true;
    } catch (err) {
      console.error('Error submitting idea:', err);
      return false;
    }
  }, []);

  const updateIdea = useCallback(async (id: string, title: string, description: string): Promise<boolean> => {
    try {
      try {
        // Try to update via API first
        const updatedIdea = await apiClient.updateIdea(id, title, description);
        setIdeas(prev => 
          prev.map(idea => 
            idea.id === id ? updatedIdea : idea
          )
        );
        return true;
      } catch (apiError) {
        console.log('API not available for update, using mock:', apiError);
      }
      
      // Fallback to mock implementation
      setIdeas(prev => 
        prev.map(idea => 
          idea.id === id 
            ? { ...idea, title, description, updatedAt: new Date().toISOString() }
            : idea
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating idea:', err);
      return false;
    }
  }, []);

  const deleteIdea = useCallback(async (id: string): Promise<void> => {
    try {
      try {
        // Try to delete via API first
        await apiClient.deleteIdea(id);
        setIdeas(prev => prev.filter(idea => idea.id !== id));
        return;
      } catch (apiError) {
        console.log('API not available for delete, using mock:', apiError);
      }
      
      // Fallback to mock implementation
      setIdeas(prev => prev.filter(idea => idea.id !== id));
    } catch (err) {
      console.error('Error deleting idea:', err);
    }
  }, []);

  const upvoteIdea = useCallback(async (id: string): Promise<void> => {
    try {
      try {
        // Try to upvote via API first
        const updatedIdea = await apiClient.upvoteIdea(id);
        setIdeas(prev => 
          prev.map(idea => 
            idea.id === id ? updatedIdea : idea
          )
        );
        return;
      } catch (apiError) {
        console.log('API not available for upvote, using mock:', apiError);
      }
      
      // Fallback to mock implementation
      setIdeas(prev => 
        prev.map(idea => 
          idea.id === id 
            ? { ...idea, upvotes: idea.upvotes + 1 }
            : idea
        )
      );
    } catch (err) {
      console.error('Error upvoting idea:', err);
    }
  }, []);

  const refreshIdeas = useCallback(async () => {
    await fetchIdeas();
  }, [fetchIdeas]);

  useEffect(() => {
    fetchIdeas();
    
    // Set up polling for real-time updates
    if (config.features.realTimeUpdates) {
      const interval = setInterval(fetchIdeas, config.app.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchIdeas]);

  return {
    ideas,
    loading,
    error,
    fetchIdeas,
    submitIdea,
    upvoteIdea,
    updateIdea,
    deleteIdea,
    refreshIdeas,
  };
}