import { useState } from "react";
import { Bell, Languages, Moon, ShieldCheck } from "lucide-react";

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

function SettingsRow({ icon: Icon, title, description, checked, onChange }) {
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
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [simpleLanguage, setSimpleLanguage] = useState(true);
  const [privacyHints, setPrivacyHints] = useState(true);

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-5">
      <section>
        <h1 className="font-display text-[1.6rem] text-text leading-tight">
          Ustawienia
        </h1>
        <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">
          Dostosuj aplikację do swojego gotowania.
        </p>
      </section>

      <section className="bg-surface rounded-2xl px-4 py-1 shadow-sm">
        <SettingsRow
          icon={Bell}
          title="Powiadomienia"
          description="Przypomnienia o zapisanych przepisach i składnikach."
          checked={notifications}
          onChange={setNotifications}
        />
        <SettingsRow
          icon={Moon}
          title="Tryb ciemny"
          description="Przygotowane miejsce na ciemniejszy motyw aplikacji."
          checked={darkMode}
          onChange={setDarkMode}
        />
        <SettingsRow
          icon={Languages}
          title="Prostszy język"
          description="Krótsze komunikaty i mniej technicznych określeń."
          checked={simpleLanguage}
          onChange={setSimpleLanguage}
        />
        <SettingsRow
          icon={ShieldCheck}
          title="Wskazówki prywatności"
          description="Pokazuj podpowiedzi przy funkcjach konta."
          checked={privacyHints}
          onChange={setPrivacyHints}
        />
      </section>
    </div>
  );
}
