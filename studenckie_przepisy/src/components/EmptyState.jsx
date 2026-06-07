function EmptyState({ onBack, description }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-8 text-center py-16">
      <span className="text-5xl">🥺</span>
      <h3 className="font-display text-xl text-text">Brak przepisów</h3>
      <p className="text-sm text-muted leading-relaxed">
        {description}
      </p>
      <button
        onClick={onBack}
        className="mt-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold shadow-[0_4px_18px_rgba(192,57,43,0.3)] hover:bg-primary-h transition-colors"
      >
        Wróć do Spiżarni
      </button>
    </div>
  );
}

export default EmptyState