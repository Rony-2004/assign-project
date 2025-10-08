'use client';

import { useState, useEffect } from 'react';

interface IdeaFormProps {
  onSubmit: (title: string, description: string) => Promise<boolean>;
  editMode?: {
    id: string;
    title: string;
    description: string;
  };
  onCancelEdit?: () => void;
}

export function IdeaForm({ onSubmit, editMode, onCancelEdit }: IdeaFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Update form when edit mode changes
  useEffect(() => {
    if (editMode) {
      setTitle(editMode.title);
      setDescription(editMode.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title' });
      return;
    }

    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a description' });
      return;
    }

    if (title.length > 100) {
      setMessage({ type: 'error', text: 'Title must be 100 characters or less' });
      return;
    }

    if (description.length > 500) {
      setMessage({ type: 'error', text: 'Description must be 500 characters or less' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const success = await onSubmit(title.trim(), description.trim());
      if (success) {
        setTitle('');
        setDescription('');
        setMessage({ 
          type: 'success', 
          text: editMode ? 'Idea updated successfully!' : 'Idea submitted successfully!' 
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: editMode ? 'Failed to update idea. Please try again.' : 'Failed to submit idea. Please try again.' 
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingTitleChars = 100 - title.length;
  const remainingDescChars = 500 - description.length;

  return (
    <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-gray-900 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative p-10">
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-orange-500/50 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              ✨
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg shadow-lg animate-bounce">
              💡
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-2">
              {editMode ? 'Edit Your Idea' : 'Share Your Brilliant Idea'}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
              {editMode ? 'Update your idea to make it even better!' : 'The world needs your creativity! Share your vision with the community.'}
            </p>
          </div>
        </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Title (Subject)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your idea a catchy title... 🎯"
            className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-base shadow-sm transition-all"
            maxLength={100}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2 px-1">
            <span className={`text-sm font-medium transition-colors ${
              remainingTitleChars < 20 
                ? 'text-red-600 dark:text-red-400' 
                : remainingTitleChars < 40 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {remainingTitleChars} characters left
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Max 100 characters
            </span>
          </div>
        </div>

        {/* Description textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail... Be creative! ✨"
            className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white resize-none text-base shadow-sm transition-all"
            rows={5}
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2 px-1">
            <span className={`text-sm font-medium transition-colors ${
              remainingDescChars < 50 
                ? 'text-red-600 dark:text-red-400' 
                : remainingDescChars < 100 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {remainingDescChars} characters left
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Max 500 characters
            </span>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl border-2 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
          }`}>
            <span className="text-xl">
              {message.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className={`flex-1 font-medium ${
              message.type === 'success'
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            }`}>
              {message.text}
            </span>
          </div>
        )}

        <div className="flex gap-3">
          {editMode && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-black py-5 px-8 rounded-2xl shadow-2xl focus:ring-4 focus:ring-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim() || title.length > 100 || description.length > 500}
            className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-black py-5 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                <span>{editMode ? 'Updating...' : 'Submitting your brilliant idea...'}</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">{editMode ? '✏️' : '🚀'}</span>
                <span className="tracking-wide">{editMode ? 'Update Idea' : 'Launch Your Idea'}</span>
              </span>
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}