export default function Header() {
  return (
    <header className="bg-soft-white/80 backdrop-blur-md border-b border-primary-sage/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary-sage/10 p-2 rounded-full mr-3">
              <svg
                className="h-6 w-6 text-primary-sage"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1 className="text-xl font-light text-deep-forest">Lucidify</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
