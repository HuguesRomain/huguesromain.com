const COLUMNS = 6;

export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-3 border-x border-grid-line md:grid-cols-6">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div
            key={i}
            className={`border-r border-grid-line last:border-r-0 ${
              i >= 3 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
