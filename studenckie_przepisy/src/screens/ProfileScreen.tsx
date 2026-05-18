import ProfileHeader from "../components/profil/ProfileHeader";
import userAvatar from "../assets/avatars/jan_kowalski_avatar.png";
import ProfileMenuList from "../components/profil/ProfileMenuList";
import type { ProfileMenuItemProps } from "../components/profil/ProfileMenuItem";


import { Utensils, Bell, Lock } from 'lucide-react'
import ProfileLogoutButton from "../components/profil/ProfileLogoutButton";

const menu_items_props: ProfileMenuItemProps[] = [
  {icon: Utensils, text: "Moje Diety"},
  {icon: Lock, text: "Zmień Hasło"},
  {icon: Bell, text: "Ustawienia Powiadomień"},
];


export default function ProfilScreen() {
  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-5">
      <ProfileHeader 
        username="Jan Kowalski" 
        userTag = "@kowalski"
        avatar={userAvatar}
      />
      <ProfileMenuList items_props={menu_items_props} />
      <ProfileLogoutButton />
    </div>
  );
}