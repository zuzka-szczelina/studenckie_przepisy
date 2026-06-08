import { Funnel, Search } from 'lucide-react'
import { IconX } from '../icons';
import { useState } from 'react';


// -----------------------------------------------------------------------------------------
// helpers

export function IngredientTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-accent text-accent-text text-[0.8rem] font-semibold pl-3 pr-2 py-1 rounded-full select-none">
      {label}
      {onRemove &&
      <button
        onClick={onRemove}
        aria-label={`Usuń ${label}`}
        className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-black/10 hover:bg-black/20 transition-colors"
      >
        <IconX />
      </button>}
    </span>
  );
}


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





// ---------------------------------------------------------------------------------
// Export default
const SearchAndFilters = ({ ingredients, activeFilters, defaultSearchText, allRecipies, setResults }) => {

  const [recipeNameSearch, setRecipeNameSearch] = useState("");

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);


  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const searched = allRecipies.filter(recipe =>
      recipe.title.toLowerCase().includes(recipeNameSearch.toLowerCase())
    );
    setResults(searched);
  }

  return (
      <section className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 bg-surface rounded-2xl px-4 py-3 shadow-sm">

          <form onSubmit={handleSubmitSearch} className="flex items-center gap-2 min-w-0 text-[0.88rem] text-muted truncate">
            <button type='submit' className="text-muted text-sm shrink-0">
              <Search className="w-4 h-4 text-text"/>
            </button>
            <input
              name="recipeNameInput" 
              defaultValue={defaultSearchText}
              onChange={(e) => setRecipeNameSearch(e.target.value)}
            />
          </form>

          <button
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-surface2 text-muted hover:text-primary transition-colors"
            aria-label="Filtry"
            onClick={() => setAreFiltersVisible(true)}
          >
            <Funnel className="w-4 h-4"/>
          </button>
        </div>

        {areFiltersVisible &&
        <div className='absolute inset-x-0 z-40 bg-surface rounded-2xl border border-shell px-4 py-3 shadow-lg'>
          <p className="text-[0.88rem] text-muted">Filtry będą dostępne tutaj.</p>
          <button onClick={() => setAreFiltersVisible(false)}>
            <IconX/>
          </button>
        </div>
        }

        {activeFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {activeFilters.map(f => (
              <ActiveFilterBadge key={f} label={f} />
            ))}
          </div>
        )}
        {ingredients.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {ingredients.map(ing => (
              <IngredientTag 
                key={ing}
                label={ing}
              />
            ))}
          </div>
        )}
      </section>
  )
}

export default SearchAndFilters
