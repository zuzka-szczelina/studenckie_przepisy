import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <div>
        <p className="text-[0.78rem] font-semibold uppercase tracking-widest text-muted">
          404
        </p>
        <h1 className="mt-2 font-display text-[1.8rem] leading-tight text-text">
          Nie znaleziono strony
        </h1>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
          Ten widok nie istnieje albo link jest nieaktualny.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/spizarnia")}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(192,57,43,0.3)] transition-colors hover:bg-primary-h"
      >
        Wróć do spiżarni
      </button>
    </div>
  );
}
