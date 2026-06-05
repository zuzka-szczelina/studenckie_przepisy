// src/screens/LoginScreen.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-svh bg-bg px-6">
      <div className="w-full max-w-[340px] flex flex-col gap-5">

        {/* Logo / tytuł */}
        <div className="text-center mb-2">
          <h1 className="font-display text-[2rem] text-primary">Kuchnia Studenta</h1>
          <p className="text-sm text-muted mt-1">
            {isRegister ? "Utwórz konto" : "Zaloguj się, by gotować"}
          </p>
        </div>

        {/* Pola */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-surface border border-shell rounded-2xl px-4 py-3.5 text-sm text-text placeholder:text-muted outline-none focus:border-primary transition-colors"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleEmailAuth()}
          className="w-full bg-surface border border-shell rounded-2xl px-4 py-3.5 text-sm text-text placeholder:text-muted outline-none focus:border-primary transition-colors"
        />

        {/* Błąd */}
        {error && (
          <p className="text-[0.8rem] text-primary text-center -mt-2">{error}</p>
        )}

        {/* Przycisk główny */}
        <button
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full py-3.5 bg-primary text-white rounded-full font-semibold text-sm shadow-[0_4px_18px_rgba(192,57,43,0.3)] hover:bg-primary-h disabled:opacity-60 transition-all"
        >
          {loading ? "Ładowanie..." : isRegister ? "Zarejestruj się" : "Zaloguj się"}
        </button>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-shell" />
          <span className="text-xs text-muted">lub</span>
          <div className="flex-1 h-px bg-shell" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full py-3.5 bg-surface border border-shell rounded-full font-semibold text-sm text-text hover:bg-surface2 transition-colors flex items-center justify-center gap-2"
        >
          <GoogleIcon /> Kontynuuj z Google
        </button>

        {/* Przełącznik rejestracja / logowanie */}
        <p className="text-center text-sm text-muted">
          {isRegister ? "Masz już konto?" : "Nie masz konta?"}{" "}
          <button
            onClick={() => { setIsRegister(v => !v); setError(null); }}
            className="text-primary font-semibold"
          >
            {isRegister ? "Zaloguj się" : "Zarejestruj się"}
          </button>
        </p>

      </div>
    </div>
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