import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bookmark,
  House,
  LogOut,
  Refrigerator,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import userAvatar from "../assets/avatars/jan_kowalski_avatar.png";

const MAIN_ITEMS = [
  { label: "Odkrywaj", path: "/wyniki", icon: House },
  { label: "Spiżarnia", path: "/spizarnia", icon: Refrigerator },
  { label: "Zapisane", path: "/zapisane", icon: Bookmark },
];

const SETTINGS_ITEMS = [
  { label: "Mój Profil", path: "/profil", icon: UserRound },
  { label: "Ustawienia", path: "/ustawienia", icon: Settings },
];

function MenuItem({ icon: Icon, label, path, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(path)}
      aria-current={active ? "page" : undefined}
      className={[
        "flex h-11 w-full items-center gap-3 rounded-full px-4 text-left text-[0.95rem] font-semibold transition-colors",
        active
          ? "bg-[#ead8be] text-[#6f5a49]"
          : "text-[#5f5048] hover:bg-[#f2e6d8]",
      ].join(" ")}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}

function MenuSection({ label, items, pathname, onSelect }) {
  return (
    <section className="flex flex-col gap-2">
      <p className="px-3 text-[0.72rem] font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <MenuItem
            key={item.label}
            {...item}
            active={pathname.startsWith(item.path)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default function SideMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label="Zamknij menu boczne"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu boczne"
        className="absolute inset-y-0 left-0 flex w-[308px] max-w-[82%] flex-col bg-[#fff8ef] shadow-[8px_0_28px_rgba(72,58,45,0.18)]"
      >
        <button
          type="button"
          className="absolute right-4 top-7 flex h-10 w-10 items-center justify-center rounded-[10px] text-[#5d4b40] transition-colors hover:bg-[#f2e6d8]"
          aria-label="Zamknij menu"
          onClick={onClose}
        >
          <X className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-10">
          <div className="mb-8">
            <div className="relative mb-5 h-16 w-16">
              <img
                src={userAvatar}
                alt="Jan Kowalski"
                className="h-16 w-16 rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-0 h-3.5 w-3.5 rounded-full bg-[#8a3f22] ring-2 ring-[#fff8ef]" />
            </div>

            <h2 className="text-[1.45rem] font-bold leading-tight text-text">
              Jan Kowalski
            </h2>
            <p className="mt-1 text-[0.85rem] text-muted">@jankowalski</p>
            <p className="mt-1 text-[0.82rem] text-muted">12 dodanych przepisów</p>
          </div>

          <div className="flex flex-col gap-8">
            <MenuSection
              label="Menu główne"
              items={MAIN_ITEMS}
              pathname={pathname}
              onSelect={handleSelect}
            />
            <MenuSection
              label="Ustawienia"
              items={SETTINGS_ITEMS}
              pathname={pathname}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div className="border-t border-[#efe4d4] px-6 py-6">
          <button
            type="button"
            className="flex h-11 items-center gap-3 rounded-full px-4 text-[0.95rem] font-semibold text-primary-h transition-colors hover:bg-primary-h/10"
            onClick={onClose}
          >
            <LogOut className="h-5 w-5" strokeWidth={2} />
            <span>Wyloguj</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
