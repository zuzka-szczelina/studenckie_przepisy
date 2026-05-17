// mockData.js
// Zastąp to później wywołaniem API.
// Struktura celowo odzwierciedla to co API powinno zwrócić.

export const RECIPES = [
  {
    id: 1,
    title: "Szybkie Spaghetti Napoli",
    image: null, // TODO: zastąp URL obrazka
    priceEstimate: 8,
    timeMinutes: 15,
    ingredients: ["makaron", "pomidory", "czosnek", "oliwa", "cebula"],
    tags: ["makaron", "włoskie", "tanie"],
  },
  {
    id: 2,
    title: "Tosty z Awokado i Jajkiem",
    image: null,
    priceEstimate: 10,
    timeMinutes: 10,
    ingredients: ["chleb", "awokado", "jajka", "sól", "pieprz", "cebula"],
    tags: ["śniadanie", "wegetariańskie"],
  },
  {
    id: 3,
    title: "Kurczak z Ryżem i Cebulą",
    image: null,
    priceEstimate: 14,
    timeMinutes: 25,
    ingredients: ["kurczak", "ryż", "cebula", "czosnek", "papryka"],
    tags: ["obiad", "białko"],
  },
  {
    id: 4,
    title: "Studencka Sałatka",
    image: null,
    priceEstimate: 6,
    timeMinutes: 5,
    ingredients: ["sałata", "pomidory", "ogórek", "oliwa", "cebula"],
    tags: ["sałatka", "wegetariańskie", "szybkie"],
  },
  {
    id: 5,
    title: "Jajecznica z Cebulą",
    image: null,
    priceEstimate: 5,
    timeMinutes: 8,
    ingredients: ["jajka", "cebula", "masło", "sól", "pieprz"],
    tags: ["śniadanie", "tanie", "szybkie"],
  },
  {
    id: 6,
    title: "Zupa Pomidorowa z Ryżem",
    image: null,
    priceEstimate: 9,
    timeMinutes: 30,
    ingredients: ["pomidory", "ryż", "cebula", "czosnek", "bulion"],
    tags: ["zupa", "obiad"],
  },
  {
    id: 7,
    title: "Wrap z Kurczakiem",
    image: null,
    priceEstimate: 13,
    timeMinutes: 20,
    ingredients: ["kurczak", "tortilla", "sałata", "pomidory", "jogurt"],
    tags: ["obiad", "białko"],
  },
  {
    id: 8,
    title: "Ryż z Warzywami",
    image: null,
    priceEstimate: 7,
    timeMinutes: 20,
    ingredients: ["ryż", "papryka", "cebula", "marchew", "sos sojowy"],
    tags: ["obiad", "wegetariańskie", "tanie"],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/**
 * Ile składników z spiżarni pokrywa dany przepis.
 * Zwraca { matched: number, total: number, hasAll: boolean }
 */
export function getIngredientMatch(recipe, pantryIngredients) {
  const pantry = pantryIngredients.map(i => i.toLowerCase());
  const matched = recipe.ingredients.filter(ing =>
    pantry.some(p => ing.toLowerCase().includes(p) || p.includes(ing.toLowerCase()))
  );
  return {
    matched: matched.length,
    total: recipe.ingredients.length,
    hasAll: matched.length === recipe.ingredients.length,
  };
}

/**
 * Filtruje i sortuje przepisy na podstawie filtrów ze Spiżarni.
 * To jest logika którą później zastąpi zapytanie do API.
 */
export function filterRecipes({ ingredients = [], timeFilter = null, costFilter = null }) {
  let results = RECIPES;

  // Filtr czasu
  if (timeFilter === "<15 min") {
    results = results.filter(r => r.timeMinutes < 15);
  } else if (timeFilter === "<30 min") {
    results = results.filter(r => r.timeMinutes < 30);
  } else if (timeFilter === ">30 min") {
    results = results.filter(r => r.timeMinutes >= 30);
  }

  // Filtr kosztu
  if (costFilter === "cheap") {
    results = results.filter(r => r.priceEstimate <= 9);
  } else if (costFilter === "medium") {
    results = results.filter(r => r.priceEstimate > 9 && r.priceEstimate <= 15);
  }

  // Sortuj: więcej pasujących składników = wyżej
  if (ingredients.length > 0) {
    results = results
      .map(r => ({ ...r, _match: getIngredientMatch(r, ingredients) }))
      .filter(r => r._match.matched > 0)
      .sort((a, b) => b._match.matched - a._match.matched);
  }

  return results;
}