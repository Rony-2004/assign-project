'use client';

import { useState } from 'react';
import { Idea } from '../../types/api';
import { formatDate, pluralize } from '../../utils/helpers';

interface IdeaCardProps {
  idea: Idea;
  onUpvote: () => void;
}

export function IdeaCard({ idea, onUpvote }: IdeaCardProps) {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted || isUpvoting) return;
    
    setIsUpvoting(true);
    try {
      await onUpvote();
      setHasUpvoted(true);
    } catch (error) {
      console.error('Error upvoting:', error);
    } finally {
      setIsUpvoting(false);
    }
  };



  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative p-8">
        <div className="flex gap-8">
          {/* Upvote Section */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleUpvote}
              disabled={isUpvoting || hasUpvoted}
              className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl font-black transition-all duration-300 transform ${
                hasUpvoted
                  ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/50 scale-110 rotate-12'
                  : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 hover:rotate-6 active:scale-95'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0`}
            >
              {isUpvoting ? (
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
              ) : hasUpvoted ? (
                <>
                  <span className="text-3xl drop-shadow-lg">✓</span>
                  <span className="text-xs mt-1 font-bold uppercase tracking-wider">Voted</span>
                </>
              ) : (
                <>
                  <span className="text-3xl drop-shadow-lg">👍</span>
                  <span className="text-xs mt-1 font-bold uppercase tracking-wider">Vote</span>
                </>
              )}
              {!hasUpvoted && !isUpvoting && (
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
            <div className="text-center space-y-1">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                {idea.upvotes}
              </div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {pluralize(idea.upvotes, 'vote')}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                {idea.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {idea.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {formatDate(idea.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}