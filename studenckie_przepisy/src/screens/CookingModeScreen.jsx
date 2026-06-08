import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RECIPES } from "../mockData";
import { IconArrowLeft } from "../icons";

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
    <div className="flex gap-1.5 w-full" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            "h-1 flex-1 rounded-full transition-all duration-300",
            i <= current ? "bg-primary" : "bg-surface2",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ─── FINISH SCREEN ────────────────────────────────────────────────────────────

function FinishScreen({ recipe, onRestart, onExit }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center gap-6 overflow-y-auto">
      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent-text border border-accent/30">
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
      <div className="flex flex-col gap-3 w-full max-w-[280px] mt-2">
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
    </main>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function CookingModeScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const recipe = RECIPES.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="flex justify-center items-start min-h-svh bg-shell font-body">
        <div className="flex w-full max-w-[390px] h-svh bg-bg items-center justify-center flex-col gap-4 px-8 text-center">
          <span className="text-5xl">:(</span>
          <h2 className="font-display text-xl text-text">Przepis nie istnieje</h2>
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold">
            Wróć
          </button>
        </div>
      </div>
    );
  }

  const steps = recipe.steps;
  const total = steps.length;
  const isDone = currentStep === total;

  const goNext = () => {
    setCurrentStep((s) => Math.min(s + 1, total));
  };

  const goPrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const exitToRecipe = () => {
    navigate(`/przepis/${recipe.id}`);
  };

  return (
    <div className="flex justify-center items-start min-h-svh bg-shell font-body">
      <div className="relative flex flex-col w-full max-w-[390px] h-svh bg-bg overflow-hidden">
        <header className="shrink-0 px-5 pt-3.5 pb-3 bg-bg border-b border-surface2">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={exitToRecipe}
              className="flex items-center justify-center w-10 h-10 rounded-[10px] text-text hover:bg-surface active:bg-surface2 transition-colors"
              aria-label="Wróć do przepisu"
            >
              <IconArrowLeft />
            </button>

            <div className="min-w-0 flex-1 text-center">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-widest">
                {isDone ? "Gotowe" : `Krok ${currentStep + 1} z ${total}`}
              </p>
              <h1 className="font-display text-[1rem] text-text leading-tight truncate">
                {recipe.title}
              </h1>
            </div>

            <div className="w-10" aria-hidden="true" />
          </div>

          {!isDone && (
            <div className="pt-3">
              <ProgressBar current={currentStep} total={total} />
            </div>
          )}
        </header>

        {isDone ? (
          <FinishScreen
            recipe={recipe}
            onRestart={() => setCurrentStep(0)}
            onExit={exitToRecipe}
          />
        ) : (
          <>
            <main className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
              <div className="flex flex-col gap-5 min-h-full">
                <section className="bg-surface rounded-2xl p-4 shadow-sm border border-shell">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-[0.9rem] font-bold flex-shrink-0">
                      {currentStep + 1}
                    </span>
                    <span className="text-[0.76rem] font-semibold text-muted">
                      {currentStep + 1}/{total}
                    </span>
                  </div>

                  <p className="font-display text-[1.35rem] leading-[1.45] text-text">
                    {steps[currentStep]}
                  </p>
                </section>

                {currentStep === 0 && (
                  <section className="bg-surface rounded-2xl px-4 py-3.5 shadow-sm border border-shell">
                    <p className="text-[0.72rem] font-medium text-muted uppercase tracking-widest mb-2.5">
                      Składniki pod ręką
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredientsDetailed.map((ing) => (
                        <span
                          key={ing.name}
                          className="inline-flex items-center rounded-full bg-bg px-3 py-1 text-[0.78rem] font-medium text-text border border-shell"
                        >
                          {ing.name}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </main>

            <footer className="shrink-0 px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] bg-bg border-t border-surface2">
              <div className="flex gap-3">
                <button
                  onClick={goPrev}
                  disabled={currentStep === 0}
                  className="flex-1 py-4 bg-surface text-muted rounded-full text-[0.95rem] font-semibold hover:bg-surface2 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all"
                >
                  Wstecz
                </button>
                <button
                  onClick={goNext}
                  className="flex-[1.35] py-4 bg-primary text-white rounded-full text-[1rem] font-semibold shadow-[0_4px_18px_rgba(192,57,43,0.35)] hover:bg-primary-h active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {currentStep === total - 1 ? "Gotowe!" : "Dalej"}
                  {currentStep < total - 1 && <IconChevronRight />}
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
