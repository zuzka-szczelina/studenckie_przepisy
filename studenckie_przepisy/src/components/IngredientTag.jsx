import { IconX } from "../icons";

export default function IngredientTag({ label, onRemove }) {
  return (
    <span className="inline-flex select-none items-center gap-1.5 rounded-full bg-accent py-1 pl-3 pr-2 text-[0.8rem] font-semibold text-accent-text">
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Usuń ${label}`}
          className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20"
        >
          <IconX />
        </button>
      )}
    </span>
  );
}
