import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RECIPES, SUBSTITUTES } from "../mockData";
import {
  IconArrowLeft,
  IconHeart,
  IconHeartFilled,
  IconClock,
  IconCoin,
  IconLeaf,
  IconRefresh,
  IconPlay,
  IconX,
} from "../icons";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatTime(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} godz. ${m} min` : `${h} godz.`;
}

function formatPrice(price) {
  return `ok. ${price} PLN / porcję`;
}

function getDifficultyLabel(minutes) {
  if (minutes <= 10) return "Bardzo łatwe";
  if (minutes <= 20) return "Łatwe";
  if (minutes <= 35) return "Średnie";
  return "Czasochłonne";
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function MetaPill({ icon, label, variant = "neutral" }) {
  const styles = {
    neutral: "bg-surface text-muted border border-shell",
    green:   "bg-accent/15 text-accent-text border border-accent/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.76rem] font-semibold ${styles[variant]}`}>
      <span className="flex">{icon}</span>
      {label}
    </span>
  );
}

function StepItem({ number, text }) {
  return (
    <div className="flex gap-3.5 items-start">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-[0.78rem] font-bold flex items-center justify-center mt-0.5">
        {number}
      </span>
      <p className="text-[0.88rem] leading-relaxed text-text pt-0.5">{text}</p>
    </div>
  );
}

function IngredientRow({ name, amount, unit, hasSubstitute, onSubstitute }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-shell last:border-b-0">
      <span className="text-[0.9rem] text-text">{name}</span>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[0.88rem] font-medium text-text">
          {amount !== null ? `${amount}${unit}` : unit}
        </span>
        {hasSubstitute && (
          <button
            onClick={onSubstitute}
            className="text-[0.68rem] font-semibold text-primary flex items-center gap-1"
          >
            <IconRefresh /> Szukaj zamiennika
          </button>
        )}
      </div>
    </div>
  );
}

// ─── MODAL ZAMIENNIKÓW ────────────────────────────────────────────────────────

function SubstituteModal({ ingredientName, onClose }) {
  const substitutes = SUBSTITUTES[ingredientName] ?? [];

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-20 bg-black/40 flex items-end"
      onClick={onClose}
    >
      {/* Panel — stopujemy propagację, żeby klik w środku nie zamykał */}
      <div
        className="w-full bg-bg rounded-t-3xl px-5 pt-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Nagłówek */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[0.72rem] text-muted font-medium uppercase tracking-wide mb-0.5">
              Zamienniki dla
            </p>
            <h3 className="font-display text-[1.15rem] text-text leading-tight">
              {ingredientName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-surface2 rounded-full flex items-center justify-center text-muted hover:text-text transition-colors flex-shrink-0"
            aria-label="Zamknij"
          >
            <IconX />
          </button>
        </div>

        {/* Lista */}
        {substitutes.length === 0 ? (
          <p className="text-sm text-muted py-4 text-center">
            Brak zamienników w bazie.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {substitutes.map((sub, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-surface rounded-2xl px-4 py-3"
              >
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent-text text-[0.72rem] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[0.9rem] font-semibold text-text">{sub.name}</p>
                  <p className="text-[0.76rem] text-muted mt-0.5">{sub.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function RecipeDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = RECIPES.find((r) => r.id === Number(id));
  const [servings, setServings] = useState(2);
  const [isFavourite, setIsFavourite] = useState(false);
  const [substituteFor, setSubstituteFor] = useState(null); // nazwa składnika lub null

  if (!recipe) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 px-8 text-center py-16">
        <span className="text-5xl">🥺</span>
        <h2 className="font-display text-xl text-text">Przepis nie istnieje</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold"
        >
          Wróć
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col">

      {/* Hero */}
      <div className="relative bg-surface h-[200px] flex items-center justify-center text-[80px] select-none">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover absolute inset-0" />
        ) : (
          <span>🍽️</span>
        )}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/85 rounded-[10px] flex items-center justify-center text-text"
            aria-label="Wróć"
          >
            <IconArrowLeft />
          </button>
          <button
            onClick={() => setIsFavourite((v) => !v)}
            className={`w-9 h-9 bg-white/85 rounded-[10px] flex items-center justify-center transition-colors ${isFavourite ? "text-primary" : "text-muted"}`}
            aria-label={isFavourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            {isFavourite ? <IconHeartFilled /> : <IconHeart />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-7 px-5 pt-5 pb-28">

        <section className="flex flex-col gap-3">
          <h1 className="font-display text-[1.7rem] leading-tight text-text">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <MetaPill icon={<IconClock size={14} />} label={formatTime(recipe.timeMinutes)} />
            <MetaPill icon={<IconCoin />}             label={formatPrice(recipe.priceEstimate)} />
            <MetaPill icon={<IconLeaf />}             label={getDifficultyLabel(recipe.timeMinutes)} variant="green" />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[1.1rem] text-text">Składniki</h2>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                className="w-7 h-7 bg-surface2 rounded-lg flex items-center justify-center text-text font-bold text-lg"
                aria-label="Mniej porcji"
              >
                −
              </button>
              <span className="text-[0.95rem] font-semibold text-text min-w-[18px] text-center">
                {servings}
              </span>
              <span className="text-[0.8rem] text-muted">porcje</span>
              <button
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                className="w-7 h-7 bg-surface2 rounded-lg flex items-center justify-center text-text font-bold text-lg"
                aria-label="Więcej porcji"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-2xl px-4 py-1">
            {recipe.ingredientsDetailed.map((ing) => {
              const scaled =
                ing.amount !== null
                  ? parseFloat(((ing.amount * servings) / 2).toFixed(1))
                  : null;
              return (
                <IngredientRow
                  key={ing.name}
                  name={ing.name}
                  amount={scaled}
                  unit={ing.unit}
                  hasSubstitute={ing.hasSubstitute}
                  onSubstitute={() => setSubstituteFor(ing.name)}
                />
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="font-display text-[1.1rem] text-text mb-4">Przygotowanie</h2>
          <div className="flex flex-col gap-4">
            {recipe.steps.map((step, i) => (
              <StepItem key={i} number={i + 1} text={step} />
            ))}
          </div>
        </section>

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 bg-bg border-t border-surface2 z-10">
        <button
          onClick={() => navigate(`/przepis/${recipe.id}/gotowanie`)}
          className="w-full py-4 bg-primary text-white rounded-full text-[1rem] font-semibold shadow-[0_4px_18px_rgba(192,57,43,0.35)] hover:bg-primary-h active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <IconPlay /> Zacznij Gotować
        </button>
      </div>

      {/* Modal zamienników */}
      {substituteFor && (
        <SubstituteModal
          ingredientName={substituteFor}
          onClose={() => setSubstituteFor(null)}
        />
      )}

    </div>
  );
}