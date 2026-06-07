function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 pt-2 pb-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted disabled:opacity-30 hover:bg-surface2 transition-colors"
        aria-label="Poprzednia strona"
      >
        ‹
      </button>
      <span className="text-sm text-muted font-medium">
        {page} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted disabled:opacity-30 hover:bg-surface2 transition-colors"
        aria-label="Następna strona"
      >
        ›
      </button>
    </div>
  );
}

export default Pagination