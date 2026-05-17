import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  return (
    <div className="flex justify-center items-start min-h-svh bg-shell font-body">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-svh bg-bg overflow-hidden">
        <TopBar />

        {/* Active screen renders here */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}