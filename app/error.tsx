"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-600">
        This page hit an unexpected error. Try again, or head back to the homepage.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
