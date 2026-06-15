import { Funnel, Search } from "lucide-react";
import { IconX } from "../icons";
import { useState } from "react";
import IngredientTag from "./IngredientTag";

function ActiveFilterBadge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-accent text-accent-text text-[0.75rem] font-semibold px-3 py-1 rounded-full">
      {label}
      {onRemove && (
        <button 
          onClick={onRemove} 
          aria-label={`Usuń filtr ${label}`} 
          className="ml-0.5 opacity-60 hover:opacity-100">
          ✕
        </button>
      )}
    </span>
  );
}

const SearchAndFilters = ({ ingredients, activeFilters, defaultSearchText, allRecipies, setResults }) => {
  const [recipeNameSearch, setRecipeNameSearch] = useState("");
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const query = recipeNameSearch.trim().toLowerCase();
    const searched = allRecipies.filter(recipe =>
      recipe.title.toLowerCase().includes(query)
    );
    setResults(searched);
  };

  return (
    <section className="relative flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3 shadow-sm">
        <form onSubmit={handleSubmitSearch} className="flex min-w-0 flex-1 items-center gap-2 text-[0.88rem] text-muted">
          <button type="submit" className="shrink-0 text-sm text-muted" aria-label="Szukaj przepisu">
            <Search className="h-4 w-4 text-text" />
          </button>
          <input
            name="recipeNameInput"
            value={recipeNameSearch}
            placeholder={defaultSearchText}
            onChange={(e) => setRecipeNameSearch(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-muted"
          />
        </form>

        <button
          type="button"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-surface2 text-muted transition-colors hover:text-primary"
          aria-label="Filtry"
          onClick={() => setAreFiltersVisible(true)}
        >
          <Funnel className="h-4 w-4" />
        </button>
      </div>

      {areFiltersVisible && (
        <div className="absolute inset-x-0 top-14 z-40 flex items-start justify-between gap-3 rounded-2xl border border-shell bg-surface px-4 py-3 shadow-lg">
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-widest text-muted">
              Aktywne filtry
            </p>
            <p className="mt-1 text-[0.88rem] text-muted">
              {activeFilters.length > 0 ? activeFilters.join(", ") : "Brak filtrów czasu lub kosztu."}
            </p>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface2 text-muted transition-colors hover:text-primary"
            onClick={() => setAreFiltersVisible(false)}
            aria-label="Zamknij filtry"
          >
            <IconX />
          </button>
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(f => (
            <ActiveFilterBadge key={f} label={f} />
          ))}
        </div>
      )}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map(ing => (
            <IngredientTag key={ing} label={ing} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchAndFilters
