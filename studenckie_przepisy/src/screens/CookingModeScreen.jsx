import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RECIPES } from "../mockData";
import { IconArrowLeft, IconX } from "../icons";

// ─── ICON HELPERS (inline, żeby nie dokładać do icons.jsx) ───────────────────

function IconCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1.5 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            "h-1 flex-1 rounded-full transition-all duration-300",
            i < current  ? "bg-primary"   :
            i === current ? "bg-primary/40" :
            "bg-surface2",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ─── FINISH SCREEN ────────────────────────────────────────────────────────────

function FinishScreen({ recipe, onRestart, onExit }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent-text">
        <IconCheck />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[1.8rem] leading-tight text-text">
          Smacznego!
        </h2>
        <p className="text-[0.9rem] text-muted leading-relaxed">
          Ukończyłeś przygotowanie: <span className="text-text font-medium">{recipe.title}</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full mt-2">
        <button
          onClick={onExit}
          className="w-full py-4 bg-primary text-white rounded-full text-[1rem] font-semibold shadow-[0_4px_18px_rgba(192,57,43,0.35)] hover:bg-primary-h active:scale-[0.98] transition-all"
        >
          Wróć do przepisu
        </button>
        <button
          onClick={onRestart}
          className="w-full py-3.5 bg-surface text-muted rounded-full text-[0.95rem] font-medium hover:bg-surface2 active:scale-[0.98] transition-all"
        >
          Zacznij od nowa
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function CookingModeScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(null); // "next" | "prev"

  const recipe = RECIPES.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 px-8 text-center py-16">
        <span className="text-5xl">🥺</span>
        <h2 className="font-display text-xl text-text">Przepis nie istnieje</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold">
          Wróć
        </button>
      </div>
    );
  }

  const steps = recipe.steps;
  const total = steps.length;
  const isDone = currentStep === total;

  const goNext = () => {
    setDirection("next");
    setCurrentStep((s) => Math.min(s + 1, total));
  };

  const goPrev = () => {
    setDirection("prev");
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div className="flex flex-col min-h-full">

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 bg-bg">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="w-9 h-9 rounded-[10px] flex items-center justify-center text-text disabled:text-muted/30 hover:bg-surface active:bg-surface2 transition-colors"
          aria-label="Poprzedni krok"
        >
          <IconArrowLeft />
        </button>

        <div className="flex flex-col items-center gap-0.5">
          {!isDone && (
            <span className="text-[0.72rem] font-medium text-muted uppercase tracking-widest">
              Krok {currentStep + 1} z {total}
            </span>
          )}
          <span className="font-display text-[0.95rem] text-text leading-tight max-w-[200px] text-center line-clamp-1">
            {recipe.title}
          </span>
        </div>

        <button
          onClick={() => navigate(`/przepis/${recipe.id}`)}
          className="w-9 h-9 rounded-[10px] flex items-center justify-center text-muted hover:bg-surface active:bg-surface2 transition-colors"
          aria-label="Wyjdź z trybu gotowania"
        >
          <IconX />
        </button>
      </header>

      {/* Progress */}
      {!isDone && (
        <div className="px-5 pb-3">
          <ProgressBar current={currentStep} total={total} />
        </div>
      )}

      {/* Step content */}
      {isDone ? (
        <FinishScreen
          recipe={recipe}
          onRestart={() => setCurrentStep(0)}
          onExit={() => navigate(`/przepis/${recipe.id}`)}
        />
      ) : (
        <div className="flex flex-col flex-1 px-5 pt-4 pb-8 gap-6">

          {/* Step number badge */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-primary text-white font-display text-[1.1rem] flex items-center justify-center flex-shrink-0">
              {currentStep + 1}
            </span>
            <div className="h-px flex-1 bg-surface2" />
          </div>

          {/* Step text */}
          <div className="flex-1 flex items-start">
            <p className="font-display text-[1.45rem] leading-[1.45] text-text">
              {steps[currentStep]}
            </p>
          </div>

          {/* Ingredients reminder — pokazuj składniki do pierwszego kroku */}
          {currentStep === 0 && (
            <div className="bg-surface rounded-2xl px-4 py-3 flex flex-col gap-2">
              <p className="text-[0.72rem] font-medium text-muted uppercase tracking-widest">
                Przypomnij sobie składniki
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {recipe.ingredientsDetailed.map((ing) => (
                  <span key={ing.name} className="text-[0.83rem] text-text">
                    · {ing.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-auto">
            {currentStep > 0 && (
              <button
                onClick={goPrev}
                className="flex-1 py-4 bg-surface text-muted rounded-full text-[0.95rem] font-semibold hover:bg-surface2 active:scale-[0.98] transition-all"
              >
                Wstecz
              </button>
            )}
            <button
              onClick={goNext}
              className="flex-1 py-4 bg-primary text-white rounded-full text-[1rem] font-semibold shadow-[0_4px_18px_rgba(192,57,43,0.35)] hover:bg-primary-h active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {currentStep === total - 1 ? "Gotowe!" : "Dalej"}
              {currentStep < total - 1 && <IconChevronRight />}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
