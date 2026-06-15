import { useState } from "react";
import { Bell, BookmarkX, RotateCcw } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        "relative h-7 w-12 rounded-full transition-colors",
        checked ? "bg-accent" : "bg-surface2",
      ].join(" ")}
    >
      <span
        className={[
          "absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

function SettingsRow({ icon: Icon, title, description, children }) {
  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-shell last:border-b-0">
      <div className="w-9 h-9 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-text" strokeWidth={1.9} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.92rem] font-semibold text-text">{title}</p>
        <p className="mt-0.5 text-[0.78rem] leading-snug text-muted">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function ActionButton({ children, onClick, variant = "neutral" }) {
  const styles = {
    neutral: "bg-surface2 text-text hover:bg-shell",
    danger: "bg-primary-h/10 text-primary-h hover:bg-primary-h/15",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-2 text-[0.78rem] font-semibold transition-colors ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useLocalStorageState("settings.notifications", {
    defaultValue: true,
  });
  const [savedRecipies, setSavedRecipies] = useLocalStorageState("savedRecipies", {
    defaultValue: [],
  });
  const [message, setMessage] = useState(null);

  const clearSavedRecipes = () => {
    setSavedRecipies([]);
    setMessage("Lista zapisanych przepisów została wyczyszczona.");
  };

  const resetSettings = () => {
    setNotifications(true);
    setMessage("Ustawienia aplikacji zostały przywrócone.");
  };

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-5">
      <section>
        <h1 className="font-display text-[1.6rem] text-text leading-tight">
          Ustawienia
        </h1>
        <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">
          Zarządzaj preferencjami i danymi zapisanymi w tej przeglądarce.
        </p>
      </section>

      {message && (
        <div className="rounded-2xl border border-accent/30 bg-accent/15 px-4 py-3 text-[0.84rem] leading-relaxed text-accent-text">
          {message}
        </div>
      )}

      <section className="bg-surface rounded-2xl px-4 py-1 shadow-sm">
        <SettingsRow
          icon={Bell}
          title="Powiadomienia"
          description={notifications ? "Powiadomienia w aplikacji są włączone." : "Powiadomienia w aplikacji są wyłączone."}
        >
          <Toggle checked={notifications} onChange={setNotifications} label="Powiadomienia" />
        </SettingsRow>
        <SettingsRow
          icon={BookmarkX}
          title="Zapisane przepisy"
          description={`Aktualnie zapisane: ${savedRecipies.length}.`}
        >
          <ActionButton onClick={clearSavedRecipes} variant="danger">
            Wyczyść
          </ActionButton>
        </SettingsRow>
        <SettingsRow
          icon={RotateCcw}
          title="Reset ustawień"
          description="Przywróć domyślne preferencje aplikacji."
        >
          <ActionButton onClick={resetSettings}>
            Reset
          </ActionButton>
        </SettingsRow>
      </section>
    </div>
  );
}
