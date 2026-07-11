"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white py-16 text-center shadow-card">
      <h1 className="text-2xl font-extrabold text-brand-900">Something went wrong</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
        This page hit an unexpected error. Try again, or head back to the homepage.
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-700"
      >
        Try again
      </button>
    </div>
  );
}
