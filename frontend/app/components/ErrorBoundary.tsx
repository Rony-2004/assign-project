interface ErrorBoundaryProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBoundary({ message, onRetry }: ErrorBoundaryProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium text-red-900 dark:text-red-200 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-700 dark:text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}