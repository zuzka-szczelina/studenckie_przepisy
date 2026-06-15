// src/screens/LoginScreen.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import PhoneShell from "../components/PhoneShell";

export default function LoginScreen() {
  const navigate  = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState(null);
  const [loading, setLoading]       = useState(false);

  const handleEmailAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/spizarnia");
    } catch (e) {
      setError(translateError(e.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/spizarnia");
    } catch (e) {
      setError(translateError(e.code));
    }
  };

  return (
    <PhoneShell>
      <main className="flex flex-1 flex-col justify-center px-5 py-8">
        <div className="flex w-full flex-col gap-5">

          <div className="mb-2 text-center">
            <h1 className="font-display text-[2rem] text-primary">Kuchnia Studenta</h1>
            <p className="mt-1 text-sm text-muted">
              {isRegister ? "Utwórz konto" : "Zaloguj się, by gotować"}
            </p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-shell bg-surface px-4 py-3.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleEmailAuth()}
            className="w-full rounded-2xl border border-shell bg-surface px-4 py-3.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
          />

          {error && (
            <p className="-mt-2 text-center text-[0.8rem] text-primary">{error}</p>
          )}

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(192,57,43,0.3)] transition-all hover:bg-primary-h disabled:opacity-60"
          >
            {loading ? "Ładowanie..." : isRegister ? "Zarejestruj się" : "Zaloguj się"}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-shell" />
            <span className="text-xs text-muted">lub</span>
            <div className="h-px flex-1 bg-shell" />
          </div>

          <button
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-shell bg-surface py-3.5 text-sm font-semibold text-text transition-colors hover:bg-surface2"
          >
            <GoogleIcon /> Kontynuuj z Google
          </button>

          <p className="text-center text-sm text-muted">
            {isRegister ? "Masz już konto?" : "Nie masz konta?"}{" "}
            <button
              onClick={() => { setIsRegister(v => !v); setError(null); }}
              className="font-semibold text-primary"
            >
              {isRegister ? "Zaloguj się" : "Zarejestruj się"}
            </button>
          </p>

        </div>
      </main>
    </PhoneShell>
  );
}

// Mini ikona Google (SVG żeby nie dodawać zależności)
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.4 35.4 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.8l6.2 5.2C40.7 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
    </svg>
  );
}

// Tłumaczenie kodów błędów Firebase na polski
function translateError(code) {
  const map = {
    "auth/user-not-found":       "Nie ma konta z tym adresem email.",
    "auth/wrong-password":       "Nieprawidłowe hasło.",
    "auth/email-already-in-use": "Ten email jest już zajęty.",
    "auth/weak-password":        "Hasło musi mieć co najmniej 6 znaków.",
    "auth/invalid-email":        "Nieprawidłowy format email.",
    "auth/popup-closed-by-user": "Zamknięto okno logowania Google.",
    "auth/invalid-credential":   "Nieprawidłowy email lub hasło.",
  };
  return map[code] ?? "Coś poszło nie tak. Spróbuj ponownie.";
}
