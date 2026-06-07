import { Funnel, Search } from 'lucide-react'
import { IconX } from '../icons';


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


const SearchAndFilters = ({ ingredients, activeFilters, defaultSearchText }) => {
  return (
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 bg-surface rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-muted text-sm flex-shrink-0">
              <Search className="w-4 h-4 text-text"/>
            </span>
            <span className="text-[0.88rem] text-muted truncate">
              {defaultSearchText}
            </span>
          </div>
          <button
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-surface2 text-muted hover:text-primary transition-colors"
            aria-label="Filtry"
          >
            <Funnel className="w-4 h-4"/>
          </button>
        </div>

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