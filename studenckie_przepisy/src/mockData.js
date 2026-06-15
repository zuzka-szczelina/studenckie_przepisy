// mockData.js
// Zastąp to później wywołaniem API.
// Struktura celowo odzwierciedla to co API powinno zwrócić.

import jajecznicaZCebula    from "./assets/recipe_images/jajecznica-z-cebula.png";
import kurczakZRyzem        from "./assets/recipe_images/kurczak-z-ryzem.jpg";
import ryzZWarzywami        from "./assets/recipe_images/ryz-z-warzywami.png";
import salatkaStudencka     from "./assets/recipe_images/salatka-studencka.jpg";
import spaghettiNapoli      from "./assets/recipe_images/spaghetti_napoli.jpg";
import tostyZAwokado        from "./assets/recipe_images/tosty_z_awokado.jpg";
import wrapZKurczakiem      from "./assets/recipe_images/wrap-z-kurczakiem.png";
import zupaPomidorowa       from "./assets/recipe_images/zupa-pomidorowa.png";

export const RECIPES = [
  {
    id: 1,
    title: "Szybkie Spaghetti Napoli",
    image: spaghettiNapoli,
    priceEstimate: 8,
    timeMinutes: 15,
    nutrition: { kcal: 520, protein: 16, carbs: 82, fat: 14 },
    ingredients: ["makaron", "pomidory", "czosnek", "oliwa", "cebula"],
    tags: ["makaron", "włoskie", "tanie"],
    ingredientsDetailed: [
      { name: "Makaron spaghetti", amount: 250, unit: "g",      hasSubstitute: true  },
      { name: "Passata pomidorowa", amount: 400, unit: "g",     hasSubstitute: true  },
      { name: "Czosnek",           amount: 3,   unit: " ząbki", hasSubstitute: false },
      { name: "Oliwa z oliwek",    amount: 2,   unit: " łyżki", hasSubstitute: true  },
      { name: "Cebula",            amount: 1,   unit: " szt.",  hasSubstitute: false },
      { name: "Sól i pieprz",      amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Ugotuj makaron w osolonej wodzie według instrukcji na opakowaniu. Zostaw pół kubka wody z gotowania.",
      "Na patelni rozgrzej oliwę, zeszklij cebulę przez 3 minuty, następnie dodaj przeciśnięty czosnek i smaż 30 sekund.",
      "Wlej passatę, dopraw solą i pieprzem. Gotuj sos na małym ogniu przez 7–8 minut, aż lekko zgęstnieje.",
      "Przełóż odcedzony makaron do sosu. Dodaj kilka łyżek wody z gotowania i wymieszaj. Podawaj od razu.",
    ],
  },
  {
    id: 2,
    title: "Tosty z Awokado i Jajkiem",
    image: tostyZAwokado,
    priceEstimate: 10,
    timeMinutes: 10,
    nutrition: { kcal: 430, protein: 18, carbs: 32, fat: 27 },
    ingredients: ["chleb", "awokado", "jajka", "sól", "pieprz", "cebula"],
    tags: ["śniadanie", "wegetariańskie"],
    ingredientsDetailed: [
      { name: "Chleb tostowy",    amount: 2,    unit: " kromki", hasSubstitute: true  },
      { name: "Awokado",          amount: 1,    unit: " szt.",   hasSubstitute: false },
      { name: "Jajka",            amount: 2,    unit: " szt.",   hasSubstitute: false },
      { name: "Cebula czerwona",  amount: 0.25, unit: " szt.",   hasSubstitute: true  },
      { name: "Sól i pieprz",     amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Opiecz chleb w tosterze lub na suchej patelni do złotego koloru.",
      "Rozgnieć miąższ awokado widelcem, dopraw solą i pieprzem, dodaj drobno posiekaną czerwoną cebulę.",
      "Usmaż jajka sadzone lub jajecznicę na maśle — wedle uznania.",
      "Posmaruj tosty pastą z awokado i połóż na wierzchu jajko. Podawaj natychmiast.",
    ],
  },
  {
    id: 3,
    title: "Kurczak z Ryżem i Cebulą",
    image: kurczakZRyzem,
    priceEstimate: 14,
    timeMinutes: 25,
    nutrition: { kcal: 560, protein: 42, carbs: 62, fat: 14 },
    ingredients: ["kurczak", "ryż", "cebula", "czosnek", "papryka"],
    tags: ["obiad", "białko"],
    ingredientsDetailed: [
      { name: "Pierś z kurczaka", amount: 300,  unit: "g",       hasSubstitute: true  },
      { name: "Ryż biały",        amount: 150,  unit: "g",       hasSubstitute: true  },
      { name: "Cebula",           amount: 1,    unit: " szt.",   hasSubstitute: false },
      { name: "Czosnek",          amount: 2,    unit: " ząbki",  hasSubstitute: false },
      { name: "Papryka słodka",   amount: 1,    unit: " szt.",   hasSubstitute: true  },
      { name: "Olej",             amount: 2,    unit: " łyżki",  hasSubstitute: true  },
      { name: "Sól i pieprz",     amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Ugotuj ryż według instrukcji na opakowaniu (ok. 15–18 minut).",
      "Kurczaka pokrój w kostkę, oprósz solą i pieprzem.",
      "Na rozgrzanym oleju zeszklij cebulę i czosnek (3 min), dodaj paprykę pokrojoną w paski i smaż kolejne 2 minuty.",
      "Dorzuć kurczaka i smaż na złoto przez 6–8 minut, mieszając co jakiś czas.",
      "Podaj kurczaka z warzywami na ryżu.",
    ],
  },
  {
    id: 4,
    title: "Studencka Sałatka",
    image: salatkaStudencka,
    priceEstimate: 6,
    timeMinutes: 5,
    nutrition: { kcal: 190, protein: 4, carbs: 14, fat: 14 },
    ingredients: ["sałata", "pomidory", "ogórek", "oliwa", "cebula"],
    tags: ["sałatka", "wegetariańskie", "szybkie"],
    ingredientsDetailed: [
      { name: "Sałata lodowa",  amount: 100,  unit: "g",       hasSubstitute: true  },
      { name: "Pomidory",       amount: 2,    unit: " szt.",   hasSubstitute: false },
      { name: "Ogórek",         amount: 0.5,  unit: " szt.",   hasSubstitute: false },
      { name: "Cebula",         amount: 0.5,  unit: " szt.",   hasSubstitute: true  },
      { name: "Oliwa z oliwek", amount: 2,    unit: " łyżki",  hasSubstitute: true  },
      { name: "Sól i pieprz",   amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Umyj i osusz sałatę, porwij liście na mniejsze kawałki.",
      "Pokrój pomidory w ćwiartki, ogórka w półplasterki, cebulę w piórka.",
      "Wszystko wrzuć do miski, skrop oliwą, dopraw solą i pieprzem.",
      "Delikatnie wymieszaj i podaj od razu.",
    ],
  },
  {
    id: 5,
    title: "Jajecznica z Cebulą",
    image: jajecznicaZCebula,
    priceEstimate: 5,
    timeMinutes: 8,
    nutrition: { kcal: 320, protein: 20, carbs: 4, fat: 25 },
    ingredients: ["jajka", "cebula", "masło", "sól", "pieprz"],
    tags: ["śniadanie", "tanie", "szybkie"],
    ingredientsDetailed: [
      { name: "Jajka",        amount: 3,    unit: " szt.",   hasSubstitute: false },
      { name: "Cebula",       amount: 0.5,  unit: " szt.",   hasSubstitute: true  },
      { name: "Masło",        amount: 15,   unit: "g",       hasSubstitute: true  },
      { name: "Sól i pieprz", amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Drobno posiekaj cebulę.",
      "Rozgrzej masło na patelni na małym ogniu. Zeszklij cebulę przez 2–3 minuty.",
      "Wbij jajka bezpośrednio na patelnię lub roztrzep je wcześniej w miseczce.",
      "Mieszaj drewnianą łyżką na małym ogniu do uzyskania kremowej konsystencji. Dopraw i podaj.",
    ],
  },
  {
    id: 6,
    title: "Zupa Pomidorowa z Ryżem",
    image: zupaPomidorowa,
    priceEstimate: 9,
    timeMinutes: 30,
    nutrition: { kcal: 310, protein: 8, carbs: 52, fat: 8 },
    ingredients: ["pomidory", "ryż", "cebula", "czosnek", "bulion"],
    tags: ["zupa", "obiad"],
    ingredientsDetailed: [
      { name: "Pomidory krojone (puszka)", amount: 400, unit: "g",      hasSubstitute: true  },
      { name: "Ryż biały",                amount: 80,  unit: "g",       hasSubstitute: true  },
      { name: "Bulion warzywny",           amount: 750, unit: "ml",      hasSubstitute: false },
      { name: "Cebula",                    amount: 1,   unit: " szt.",   hasSubstitute: false },
      { name: "Czosnek",                   amount: 2,   unit: " ząbki",  hasSubstitute: false },
      { name: "Oliwa z oliwek",            amount: 1,   unit: " łyżka",  hasSubstitute: true  },
      { name: "Sól i pieprz",              amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Na oliwie zeszklij drobno posiekaną cebulę i czosnek przez 4 minuty.",
      "Dodaj pomidory z puszki, rozgnieć je łyżką i smaż 2 minuty.",
      "Wlej bulion, zagotuj, następnie dodaj opłukany ryż.",
      "Gotuj na małym ogniu ok. 18 minut, aż ryż będzie miękki. Dopraw solą i pieprzem.",
    ],
  },
  {
    id: 7,
    title: "Wrap z Kurczakiem",
    image: wrapZKurczakiem,
    priceEstimate: 13,
    timeMinutes: 20,
    nutrition: { kcal: 520, protein: 36, carbs: 48, fat: 18 },
    ingredients: ["kurczak", "tortilla", "sałata", "pomidory", "jogurt"],
    tags: ["obiad", "białko"],
    ingredientsDetailed: [
      { name: "Tortilla pszenna",  amount: 2,   unit: " szt.",   hasSubstitute: true  },
      { name: "Pierś z kurczaka",  amount: 200, unit: "g",       hasSubstitute: true  },
      { name: "Sałata",            amount: 50,  unit: "g",       hasSubstitute: false },
      { name: "Pomidor",           amount: 1,   unit: " szt.",   hasSubstitute: false },
      { name: "Jogurt naturalny",  amount: 3,   unit: " łyżki",  hasSubstitute: true  },
      { name: "Sól, pieprz, papryka", amount: null, unit: "do smaku", hasSubstitute: false },
    ],
    steps: [
      "Kurczaka pokrój w paski, oprósz papryką, solą i pieprzem.",
      "Smaż na suchej patelni lub z łyżką oliwy przez 6–8 minut do pełnego wysmażenia.",
      "Tortille podgrzej na suchej patelni przez 30 sekund z każdej strony.",
      "Posmaruj tortillę jogurtem, ułóż sałatę, pomidora w plasterkach i kurczaka. Zawiń szczelnie i podaj.",
    ],
  },
  {
    id: 8,
    title: "Ryż z Warzywami",
    image: ryzZWarzywami,
    priceEstimate: 7,
    timeMinutes: 20,
    nutrition: { kcal: 410, protein: 9, carbs: 68, fat: 12 },
    ingredients: ["ryż", "papryka", "cebula", "marchew", "sos sojowy"],
    tags: ["obiad", "wegetariańskie", "tanie"],
    ingredientsDetailed: [
      { name: "Ryż biały",      amount: 150,  unit: "g",       hasSubstitute: true  },
      { name: "Papryka",        amount: 1,    unit: " szt.",   hasSubstitute: false },
      { name: "Cebula",         amount: 1,    unit: " szt.",   hasSubstitute: false },
      { name: "Marchew",        amount: 1,    unit: " szt.",   hasSubstitute: false },
      { name: "Sos sojowy",     amount: 2,    unit: " łyżki",  hasSubstitute: true  },
      { name: "Olej sezamowy",  amount: 1,    unit: " łyżka",  hasSubstitute: true  },
    ],
    steps: [
      "Ugotuj ryż według instrukcji (ok. 15–18 minut), odcedź.",
      "Pokrój marchew w słupki, paprykę w paski, cebulę w piórka.",
      "Na rozgrzanym oleju smaż marchew przez 3 minuty, dodaj cebulę i paprykę, smaż kolejne 4 minuty.",
      "Dodaj ugotowany ryż, skrop sosem sojowym i olejem sezamowym. Wymieszaj i podgrzej przez minutę.",
    ],
  },
];


export const SUBSTITUTES = {
  "Makaron spaghetti":    [
    { name: "Makaron penne",       note: "podobny czas gotowania" },
    { name: "Makaron ryżowy",      note: "bezglutenowy" },
    { name: "Cukinia w paski",     note: "opcja niskokaloryczna" },
  ],
  "Passata pomidorowa":   [
    { name: "Pomidory z puszki",   note: "rozgniecione widelcem" },
    { name: "Świeże pomidory",     note: "ok. 4 szt., sparzone ze skórką" },
    { name: "Koncentrat pomidorowy", note: "użyj ½ ilości + dolej wodę" },
  ],
  "Oliwa z oliwek":       [
    { name: "Olej rzepakowy",      note: "neutralny smak" },
    { name: "Olej kokosowy",       note: "lekko słodkawy aromat" },
    { name: "Masło klarowane",     note: "bardziej maślany smak" },
  ],
  "Chleb tostowy":        [
    { name: "Bagietka",            note: "pokrojona ukośnie i opieczona" },
    { name: "Chleb żytni",        note: "bardziej sycący" },
    { name: "Wrapy/tortilla",      note: "opcja bezglutenowa dostępna" },
  ],
  "Cebula czerwona":      [
    { name: "Cebula biała",        note: "łagodniejszy smak po podsmażeniu" },
    { name: "Szczypiorek",         note: "na surowo, drobno pokrojony" },
    { name: "Szalotka",            note: "delikatniejszy aromat" },
  ],
  "Pierś z kurczaka":     [
    { name: "Udko z kurczaka",     note: "bardziej soczyste" },
    { name: "Indyk",               note: "podobna wartość odżywcza" },
    { name: "Tofu twarde",         note: "opcja wegańska — marynuj 30 min" },
  ],
  "Ryż biały":            [
    { name: "Ryż brązowy",         note: "zdrowszy, gotuj 35–40 min" },
    { name: "Kasza jaglana",       note: "bezglutenowa, gotuj 20 min" },
    { name: "Kasza kuskus",        note: "najszybsza — zalej wrzątkiem" },
  ],
  "Papryka słodka":       [
    { name: "Cukinia",             note: "podobna tekstura po usmażeniu" },
    { name: "Marchew",             note: "pokrojona w cienkie słupki" },
    { name: "Papryka ostra",       note: "ostrzejsza wersja — użyj mniej" },
  ],
  "Masło":                [
    { name: "Oliwa z oliwek",      note: "zdrowszy tłuszcz" },
    { name: "Margaryna roślinna",  note: "opcja wegańska" },
    { name: "Olej kokosowy",       note: "nadaje delikatny aromat" },
  ],
  "Sałata lodowa":        [
    { name: "Rukola",              note: "bardziej wyrazisty, lekko gorzki smak" },
    { name: "Szpinak baby",        note: "delikatniejszy, bogatszy w żelazo" },
    { name: "Kapusta pekińska",    note: "chrupiąca, tańsza alternatywa" },
  ],
  "Tortilla pszenna":     [
    { name: "Tortilla kukurydziana", note: "bezglutenowa" },
    { name: "Liście sałaty",       note: "opcja niskokaloryczna" },
    { name: "Naan",                note: "grubszy, bardziej sycący" },
  ],
  "Jogurt naturalny":     [
    { name: "Śmietana 18%",        note: "bogatszy smak" },
    { name: "Jogurt grecki",       note: "gęstszy, więcej białka" },
    { name: "Majonez",             note: "kaloryczniejszy, ale popularny w wrapach" },
  ],
  "Sos sojowy":           [
    { name: "Tamari",              note: "bezglutenowy zamiennik 1:1" },
    { name: "Sos rybny",           note: "użyj ½ ilości — bardziej intensywny" },
    { name: "Sos Worcestershire",  note: "dodaj odrobinę soli" },
  ],
  "Olej sezamowy":        [
    { name: "Oliwa z oliwek",      note: "neutralniejszy smak" },
    { name: "Masło orzechowe (1 łyżeczka)", note: "orzechowy aromat" },
    { name: "Olej arachidowy",     note: "podobny orzechowy akcent" },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

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

export function filterRecipes({ ingredients = [], timeFilter = null, costFilter = null }) {
  let results = RECIPES;

  if (timeFilter === "<15 min") {
    results = results.filter(r => r.timeMinutes < 15);
  } else if (timeFilter === "<30 min") {
    results = results.filter(r => r.timeMinutes < 30);
  } else if (timeFilter === ">30 min") {
    results = results.filter(r => r.timeMinutes >= 30);
  }

  if (costFilter === "cheap") {
    results = results.filter(r => r.priceEstimate <= 9);
  } else if (costFilter === "medium") {
    results = results.filter(r => r.priceEstimate > 9 && r.priceEstimate <= 15);
  }

  if (ingredients.length > 0) {
    results = results
      .map(r => ({ ...r, _match: getIngredientMatch(r, ingredients) }))
      .filter(r => r._match.matched > 0)
      .sort((a, b) => b._match.matched - a._match.matched);
  }

  return results;
}
