'use client';

import { useState } from 'react';
import { Idea } from '../../types/api';
import { formatDate, pluralize } from '../../utils/helpers';

interface IdeaCardProps {
  idea: Idea;
  onUpvote: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function IdeaCard({ idea, onUpvote, onEdit, onDelete }: IdeaCardProps) {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (confirm('Are you sure you want to delete this idea?')) {
      setIsDeleting(true);
      try {
        await onDelete();
      } catch (error) {
        console.error('Error deleting:', error);
        setIsDeleting(false);
      }
    }
  };



  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Upvote Section */}
          <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-start gap-3 sm:gap-4">
            <button
              onClick={handleUpvote}
              disabled={isUpvoting || hasUpvoted}
              className={`relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl font-black transition-all duration-300 transform ${
                hasUpvoted
                  ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/50 scale-110 rotate-12'
                  : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 hover:rotate-6 active:scale-95'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0`}
            >
              {isUpvoting ? (
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-white border-t-transparent"></div>
              ) : hasUpvoted ? (
                <>
                  <span className="text-2xl sm:text-3xl drop-shadow-lg">✓</span>
                  <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-bold uppercase tracking-wider hidden sm:block">Voted</span>
                </>
              ) : (
                <>
                  <span className="text-2xl sm:text-3xl drop-shadow-lg">👍</span>
                  <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-bold uppercase tracking-wider hidden sm:block">Vote</span>
                </>
              )}
              {!hasUpvoted && !isUpvoting && (
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
            <div className="text-center sm:text-center space-y-0.5 sm:space-y-1">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                {idea.upvotes}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {pluralize(idea.upvotes, 'vote')}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                {idea.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {idea.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {formatDate(idea.createdAt)}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onEdit}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 flex-1 sm:flex-initial"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="hidden xs:inline">Edit</span>
                  <span className="xs:hidden">✏️</span>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                      <span className="hidden sm:inline">Deleting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden xs:inline">Delete</span>
                      <span className="xs:hidden">🗑️</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}