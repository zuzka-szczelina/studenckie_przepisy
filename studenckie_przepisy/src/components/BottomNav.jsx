import { useNavigate, useLocation } from "react-router-dom";
import { IconCompass, IconFridge, IconBookmark, IconUser } from "../icons";

const NAV_ITEMS = [
  { id: "discover", label: "Odkrywaj",  path: "/odkrywaj",  icon: <IconCompass />  },
  { id: "pantry",   label: "Spiżarnia", path: "/spizarnia", icon: <IconFridge />   },
  { id: "saved",    label: "Zapisane",  path: "/zapisane",  icon: <IconBookmark /> },
  { id: "profile",  label: "Profil",    path: "/profil",    icon: <IconUser />     },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="flex justify-around items-center pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] bg-bg border-t border-surface2 sticky bottom-0"
      aria-label="Nawigacja główna"
    >
      {NAV_ITEMS.map(item => {
        const isActive = pathname.startsWith(item.path);
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={[
              "flex flex-col items-center gap-0.5 px-4 py-1 rounded-[10px] min-w-[60px] transition-colors",
              isActive ? "text-nav-active" : "text-muted",
            ].join(" ")}
          >
            <span className="flex">{item.icon}</span>
            <span className="text-[0.67rem] font-medium tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}