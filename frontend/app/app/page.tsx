'use client';

import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { IdeaCard } from './components/IdeaCard';
import { IdeaForm } from './components/IdeaForm';
import { useIdeas } from '../hooks/useIdeas';
import { pluralize } from '../utils/helpers';

export default function IdeaBoardApp() {
  const { ideas, loading, error, submitIdea, upvoteIdea, refreshIdeas } = useIdeas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Header */}
      <Header 
        title="Idea Board" 
        subtitle="Share your ideas anonymously and vote on others"
        showBackLink={false}
      />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Idea Submission Form */}
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <IdeaForm onSubmit={submitIdea} />
        </div>

        {/* Ideas List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between bg-gradient-to-r from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-gray-800 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-purple-500/50 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                  {ideas.length}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Community Ideas
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 font-semibold">
                  {ideas.length === 0 ? 'No ideas yet - be the first!' : `${ideas.length} brilliant ${pluralize(ideas.length, 'idea')} shared`}
                </p>
              </div>
            </div>
            <button
              onClick={refreshIdeas}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
              disabled={loading}
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{loading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>

          {error && (
            <ErrorBoundary message={error} onRetry={refreshIdeas} />
          )}

          {loading && ideas.length === 0 ? (
            <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading brilliant ideas...</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Just a moment</p>
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No ideas yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Be the first to share your brilliant idea with the community!
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <span>�</span>
                <span>Use the form above to get started</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-5">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onUpvote={() => upvoteIdea(idea.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}