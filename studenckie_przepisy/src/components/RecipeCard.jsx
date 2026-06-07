import useSavedRecipies from "../hooks/useSavedRecipies";
import { IconBookmark, IconBookmarkFilled } from "../icons";
import { getIngredientMatch } from "../mockData";
import MatchBadge from "./MatchBadge";


function formatPrice(price) {
  return `ok. ${price} PLN`;
}

function formatTime(minutes) {
  return `${minutes} MIN`;
}


function RecipeCard({ recipe, pantryIngredients, navigate }) {
  const match = getIngredientMatch(recipe, pantryIngredients);
  const { isSavedRecipe } = useSavedRecipies();

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
            console.log("Ulubione:", recipe.id);
          }}
          aria-label="Dodaj do ulubionych"
          className={`absolute top-1.5 right-1.5 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-[0.7rem] hover:bg-white transition-colors ${isSavedRecipe(recipe.id) ? "text-primary" : "text-muted"}`}
        >
          {isSavedRecipe(recipe.id) ? 
            <IconBookmarkFilled className="w-4 h-4"/> : 
            <IconBookmark className="w-4 h-4"/>}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <h3 className="font-display text-[0.95rem] text-text leading-tight line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 text-[0.75rem] text-muted">
          <span className="flex items-center gap-1">
            <span>💰</span> {formatPrice(recipe.priceEstimate)}
          </span>
          <span className="flex items-center gap-1">
            <span>⏱</span> {formatTime(recipe.timeMinutes)}
          </span>
        </div>
        <MatchBadge {...match} />
      </div>
    </article>
  );
}

export default RecipeCard