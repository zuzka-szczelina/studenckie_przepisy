import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconFilter, IconCoin, IconLeaf } from "../icons";
import IngredientTag from "../components/IngredientTag";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const TIME_FILTERS = ["<15 min", "<30 min", ">30 min"];
const COST_FILTERS = [
  { id: "cheap",  label: "Tanie",   icon: <IconCoin /> },
  { id: "medium", label: "Średnie", icon: <IconLeaf /> },
];

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-text text-bg"
          : "bg-surface text-muted hover:bg-surface2 hover:text-text",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function CostPill({ id, label, icon, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-text text-bg"
          : "bg-surface text-muted hover:bg-surface2 hover:text-text",
      ].join(" ")}
    >
      <span className="flex">{icon}</span>
      {label}
    </button>
  );
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

export default function SpizarniaScreen() {
  const [ingredients, setIngredients] = useState(["kurczak", "ryż", "cebula"]);
  const [inputValue,  setInputValue]  = useState("");
  const [activeTime,  setActiveTime]  = useState("<30 min");
  const [activeCost,  setActiveCost]  = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const canSearch = ingredients.length > 0 || activeTime !== null || activeCost !== null;

  const addIngredient = (value) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients(prev => [...prev, trimmed]);
    }
    setInputValue("");
  };

  const removeIngredient = (label) => {
    setIngredients(prev => prev.filter(i => i !== label));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(inputValue);
    }
    if (e.key === "Backspace" && inputValue === "" && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    }
  };

  const handleSearch = () => {
    if (!canSearch) return;
    navigate('/wyniki', { state: { ingredients, activeTime, activeCost } });
  };

  return (
    <div className="flex flex-col gap-7 px-5 pt-3 pb-5">

      {/* Hero */}
      <section className="pt-2">
        <h1 className="font-display text-[2.4rem] leading-[1.15] text-text mb-2.5">
          Co masz w<br />lodówce?
        </h1>
        <p className="text-[0.88rem] leading-relaxed text-muted">
          Wpisz składniki, a my znajdziemy przepis,<br />
          który nie zrujnuje Twojego budżetu.
        </p>
      </section>

      {/* Input + Search */}
      <section className="flex flex-col gap-3.5">
        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-surface rounded-2xl px-4 py-3.5 shadow-sm cursor-text focus-within:ring-2 focus-within:ring-primary transition-shadow"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex text-muted"><IconPlus /></span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={() => inputValue && addIngredient(inputValue)}
              placeholder="Dodaj składnik (np. jajka, ryż...)"
              className="flex-1 text-[0.93rem] text-text placeholder:text-muted bg-transparent outline-none"
              aria-label="Dodaj składnik"
            />
          </div>

          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {ingredients.map(ing => (
                <IngredientTag
                  key={ing}
                  label={ing}
                  onRemove={() => removeIngredient(ing)}
                />
              ))}
              <button
                onClick={e => { e.stopPropagation(); inputRef.current?.focus(); }}
                className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-muted border border-dashed border-muted/50 rounded-full px-3 py-1 hover:text-primary hover:border-primary transition-colors"
              >
                <IconPlus size={13} /> Dodaj więcej
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Filters */}
      <section className="flex flex-col gap-4 pb-2">
        <h2 className="flex items-center gap-2 font-display text-[1.05rem] text-text">
          <span className="flex text-primary"><IconFilter /></span>
          Szybkie filtry
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-[0.75rem] font-medium text-muted uppercase tracking-widest">
            Czas przygotowania
          </p>
          <div className="flex gap-2 flex-wrap">
            {TIME_FILTERS.map(t => (
              <FilterPill
                key={t}
                label={t}
                active={activeTime === t}
                onClick={() => setActiveTime(activeTime === t ? null : t)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[0.75rem] font-medium text-muted uppercase tracking-widest">
            Koszt
          </p>
          <div className="flex gap-2 flex-wrap">
            {COST_FILTERS.map(c => (
              <CostPill
                key={c.id}
                {...c}
                active={activeCost === c.id}
                onClick={id => setActiveCost(activeCost === id ? null : id)}
              />
            ))}
          </div>
        </div>
      </section>

      <button
          onClick={handleSearch}
          disabled={!canSearch}
          className={[
            "w-full py-4 rounded-full text-[1rem] font-semibold tracking-wide transition-all",
            canSearch
              ? "bg-primary text-white shadow-[0_4px_18px_rgba(192,57,43,0.35)] hover:bg-primary-h hover:shadow-[0_6px_22px_rgba(192,57,43,0.45)] active:scale-[0.98]"
              : "bg-surface2 text-muted cursor-not-allowed",
          ].join(" ")}
        >
          Szukaj przepisów
        </button>

    </div>
  );
}
