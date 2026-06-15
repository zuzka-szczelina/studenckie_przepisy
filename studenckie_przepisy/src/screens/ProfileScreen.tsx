import ProfileHeader from "../components/profil/ProfileHeader";
import userAvatar from "../assets/avatars/jan_kowalski_avatar.png";
import ProfileMenuList from "../components/profil/ProfileMenuList";
import type { ProfileMenuItemProps } from "../components/profil/ProfileMenuItem";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";


import { Bookmark, Lock, Settings } from 'lucide-react'
import ProfileLogoutButton from "../components/profil/ProfileLogoutButton";

export default function ProfilScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notice, setNotice] = useState<string | null>(null);

  const handlePasswordReset = async () => {
    if (!user?.email) {
      setNotice("To konto nie ma przypisanego adresu email do resetu hasła.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      setNotice(`Wysłano link do zmiany hasła na adres ${user.email}.`);
    } catch {
      setNotice("Nie udało się wysłać linku resetującego hasło. Spróbuj ponownie później.");
    }
  };

  const menu_items_props: ProfileMenuItemProps[] = [
    {
      icon: Bookmark,
      text: "Zapisane przepisy",
      description: "Przejdź do listy ulubionych przepisów.",
      onClick: () => navigate("/zapisane"),
    },
    {
      icon: Settings,
      text: "Ustawienia aplikacji",
      description: "Powiadomienia i dane zapisane w przeglądarce.",
      onClick: () => navigate("/ustawienia"),
    },
    {
      icon: Lock,
      text: "Zmień hasło",
      description: "Wyślij link resetujący hasło na email konta.",
      onClick: handlePasswordReset,
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-5">
      <ProfileHeader 
        username="Jan Kowalski" 
        userTag = "@kowalski"
        avatar={userAvatar}
      />
      {notice && (
        <div className="rounded-2xl border border-accent/30 bg-accent/15 px-4 py-3 text-[0.84rem] leading-relaxed text-accent-text">
          {notice}
        </div>
      )}
      <ProfileMenuList items_props={menu_items_props} />
      <ProfileLogoutButton />
    </div>
  );
}
