import { IconMenu, IconSearch } from "../icons";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-bg">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-[10px] text-text hover:bg-surface active:bg-surface2 transition-colors"
        aria-label="Menu"
      >
        <IconMenu />
      </button>

      <span className="font-display text-[1.1rem] text-primary tracking-wide">
        Kuchnia Studenta
      </span>

      <button
        className="flex items-center justify-center w-10 h-10 rounded-[10px] text-text hover:bg-surface active:bg-surface2 transition-colors"
        aria-label="Szukaj"
      >
        <IconSearch />
      </button>
    </header>
  );
}