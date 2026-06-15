import useSavedRecipies from "../hooks/useSavedRecipies";
import { IconBookmark, IconBookmarkFilled, IconClock, IconCoin } from "../icons";
import { getIngredientMatch } from "../mockData";
import MatchBadge from "./MatchBadge";


function formatPrice(price) {
  return `ok. ${price} PLN`;
}

function formatTime(minutes) {
  return `${minutes} MIN`;
}


function RecipeCard({ recipe, pantryIngredients, navigate, onSavedChange }) {
  const match = getIngredientMatch(recipe, pantryIngredients);
  const isIngredientsFilterUsed = pantryIngredients.length > 0;
  const { isSavedRecipe, toggleIsSavedRecipe } = useSavedRecipies();
  const saved = isSavedRecipe(recipe.id);

  return (
    <article
      onClick={() => navigate(`/przepis/${recipe.id}`)}
      className="flex items-center gap-4 bg-surface rounded-2xl p-3.5 shadow-sm cursor-pointer hover:bg-surface2 active:scale-[0.99] transition-all"
    >
      <div className="w-[72px] h-[72px] rounded-xl bg-surface2 flex-shrink-0 overflow-hidden relative">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl select-none">
            🍽️
          </div>
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleIsSavedRecipe(recipe.id);
            onSavedChange?.(recipe.id);
          }}
          aria-label={saved ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          className={`absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[0.7rem] transition-colors hover:bg-white ${saved ? "text-primary" : "text-muted"}`}
        >
          {saved ? <IconBookmarkFilled className="h-4 w-4" /> : <IconBookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <h3 className="font-display text-[0.95rem] text-text leading-tight line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 text-[0.75rem] text-muted">
          <span className="flex items-center gap-1">
            <IconCoin /> {formatPrice(recipe.priceEstimate)}
          </span>
          <span className="flex items-center gap-1">
            <IconClock size={14} /> {formatTime(recipe.timeMinutes)}
          </span>
        </div>
        <MatchBadge {...match} isIngredientsFilterUsed={isIngredientsFilterUsed} />
      </div>
    </article>
  );
}

export default RecipeCard
