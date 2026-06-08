import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RECIPES } from "../mockData";
import useSavedRecipies from "../hooks/useSavedRecipies";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import SearchAndFilters from "../components/SearchAndFilters";

const PAGE_SIZE = 4;


// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function SavedRecipiesScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { savedRecipies } = useSavedRecipies();

  const ingredients = [];
  const activeTime  = null;
  const activeCost  = null;
//   todo: filtering the ingredients, time and cost 


  const allRecipies = RECIPES.filter(recipe => savedRecipies.includes(recipe.id))
  const [results, setResults] = useState(allRecipies);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const pageItems  = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilters = [
    ...(activeTime ? [activeTime] : []),
    ...(activeCost === "cheap"  ? ["Tanie"]   : []),
    ...(activeCost === "medium" ? ["Średnie"] : []),
  ];

  const handlePrev = () => { setPage(p => Math.max(1, p - 1)); window.scrollTo?.(0, 0); };
  const handleNext = () => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo?.(0, 0); };

  return (
    <div className="flex flex-col gap-5 px-5 pt-3 pb-5">
      <SearchAndFilters 
        ingredients={ingredients} 
        activeFilters={activeFilters} 
        defaultSearchText="Wszystkie zapisane"
        allRecipies={allRecipies}
        setResults={setResults}
      />

      <h2 className="font-display text-[1.6rem] text-text leading-tight">
        Zapisane przepisy ({results.length})
      </h2>

      {results.length === 0 ? (
        <EmptyState 
            onBack={() => navigate("/spizarnia")} 
            description="Nie nie masz zapisanych przepisów."
        />
      ) : (
        <section className="flex flex-col gap-3">
          {pageItems.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              pantryIngredients={ingredients}
              navigate={navigate}
            />
          ))}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </section>
      )}

    </div>
  );
}