import { useLocation, useNavigate } from "react-router-dom";
import { filterRecipes, getIngredientMatch } from "../mockData";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatTime(minutes) {
  return `${minutes} MIN`;
}

function formatPrice(price) {
  return `ok. ${price} PLN`;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ActiveFilterBadge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-accent text-accent-text text-[0.75rem] font-semibold px-3 py-1 rounded-full">
      {label}
      {onRemove && (
        <button onClick={onRemove} aria-label={`Usuń filtr ${label}`} className="ml-0.5 opacity-60 hover:opacity-100">
          ✕
        </button>
      )}
    </span>
  );
}

function MatchBadge({ matched, total, hasAll }) {
  if (hasAll) {
    return (
      <span className="inline-flex items-center gap-1 bg-accent/20 text-accent-text text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full">
        <span className="text-accent">✓</span> Masz wszystko!
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-surface2 text-muted text-[0.72rem] font-medium px-2.5 py-0.5 rounded-full">
      Masz {matched}/{total} składników
    </span>
  );
}

function RecipeCard({ recipe, pantryIngredients }) {
  const navigate = useNavigate();
  const match = getIngredientMatch(recipe, pantryIngredients);

  return (
    <article
      onClick={() => {
        // TODO: navigate(`/przepis/${recipe.id}`)
        console.log("Otwórz przepis:", recipe.id);
      }}
      className="flex items-center gap-4 bg-surface rounded-2xl p-3.5 shadow-sm cursor-pointer hover:bg-surface2 active:scale-[0.99] transition-all"
    >
      {/* Thumbnail */}
      <div className="w-[72px] h-[72px] rounded-xl bg-surface2 flex-shrink-0 overflow-hidden relative">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl select-none">
            🍽️
          </div>
        )}
        {/* Favourite button */}
        <button
          onClick={e => {
            e.stopPropagation();
            // TODO: toggleFavourite(recipe.id)
            console.log("Ulubione:", recipe.id);
          }}
          aria-label="Dodaj do ulubionych"
          className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-[0.7rem] hover:bg-white transition-colors"
        >
          ♡
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <h3 className="font-display text-[0.95rem] text-text leading-tight line-clamp-2">
          {recipe.title}
        </h3>

        {/* Price + Time */}
        <div className="flex items-center gap-3 text-[0.75rem] text-muted">
          <span className="flex items-center gap-1">
            <span>💰</span> {formatPrice(recipe.priceEstimate)}
          </span>
          <span className="flex items-center gap-1">
            <span>⏱</span> {formatTime(recipe.timeMinutes)}
          </span>
        </div>

        {/* Match badge */}
        <MatchBadge {...match} />
      </div>
    </article>
  );
}

function EmptyState({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-8 text-center py-16">
      <span className="text-5xl">🥺</span>
      <h3 className="font-display text-xl text-text">Brak przepisów</h3>
      <p className="text-sm text-muted leading-relaxed">
        Nie znaleźliśmy nic pasującego do Twoich składników i filtrów. Spróbuj zmienić filtry.
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

// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function WynikiScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Odczytaj co przekazała Spiżarnia
  const ingredients = state?.ingredients ?? [];
  const activeTime  = state?.activeTime  ?? null;
  const activeCost  = state?.activeCost  ?? null;

  const results = filterRecipes({ ingredients, timeFilter: activeTime, costFilter: activeCost });

  // Buduj etykiety aktywnych filtrów
  const activeFilters = [
    ...(activeTime ? [activeTime] : []),
    ...(activeCost === "cheap"  ? ["Tanie"]   : []),
    ...(activeCost === "medium" ? ["Średnie"] : []),
  ];

  return (
    <div className="flex flex-col gap-5 px-5 pt-3 pb-5">

      {/* Search context bar */}
      <section className="flex flex-col gap-3">
        {/* Search summary pill */}
        <div className="flex items-center justify-between gap-3 bg-surface rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-muted text-sm flex-shrink-0">🔍</span>
            <span className="text-[0.88rem] text-muted truncate">
              {ingredients.length > 0
                ? ingredients.join(", ")
                : "Wszystkie przepisy"}
            </span>
          </div>
          {/* Filter icon — TODO: otworzyć panel filtrów */}
          <button
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-surface2 text-muted hover:text-primary transition-colors"
            aria-label="Filtry"
          >
            ⚙️
          </button>
        </div>

        {/* Active filter badges */}
        {activeFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {activeFilters.map(f => (
              <ActiveFilterBadge key={f} label={f} />
            ))}
          </div>
        )}
      </section>

      {/* Results count */}
      <h2 className="font-display text-[1.6rem] text-text leading-tight">
        Znaleziono ({results.length})
      </h2>

      {/* Recipe list */}
      {results.length === 0 ? (
        <EmptyState onBack={() => navigate("/spizarnia")} />
      ) : (
        <section className="flex flex-col gap-3 pb-6">
          {results.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              pantryIngredients={ingredients}
            />
          ))}
        </section>
      )}

    </div>
  );
}