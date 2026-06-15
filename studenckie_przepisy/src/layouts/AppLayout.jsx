import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import SideMenu from "../components/SideMenu";
import PhoneShell from "../components/PhoneShell";

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <PhoneShell>
      <TopBar onMenuClick={openMenu} />

      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>

      <BottomNav />
      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </PhoneShell>
  );
}
