
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-blue-950 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center gap-6">
        <h1 className="text-4xl sm:text-6xl font-bold text-blue-700 dark:text-blue-300 mb-4">Welcome to Idea Board</h1>
        <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Unleash creativity. Share your ideas anonymously. Upvote what inspires you. Real-time, simple, and fun.
        </p>
        <Link
          href="/app"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Try the Idea Board
        </Link>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center py-12 px-4 bg-white dark:bg-blue-950 gap-8">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">💡</span>
            <h3 className="font-bold mb-2">Anonymous Sharing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">Post ideas without logging in. Your voice, your thoughts, no barriers.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">⚡</span>
            <h3 className="font-bold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">See new ideas and upvotes instantly. Stay in the flow of creativity.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">👍</span>
            <h3 className="font-bold mb-2">Upvote Ideas</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">Support the best ideas with a single click. Let the community decide what’s hot.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl mb-2">🔒</span>
            <h3 className="font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">No personal data collected. Your privacy is our priority.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-blue-100 dark:bg-blue-900">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Ready to share your ideas?</h2>
        <Link
          href="/app"
          className="bg-blue-600 text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Go to Idea Board
        </Link>
      </section>
    </div>
  );
}
