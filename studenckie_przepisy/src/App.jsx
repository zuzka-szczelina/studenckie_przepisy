import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactGA from "react-ga4";
import AppLayout from "./layouts/AppLayout";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import SpizarniaPage from "./pages/SpizarniaPage";
import WynikiPage from "./pages/WynikiPage";
import ProfilePage from "./pages/ProfilePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CookingModePage from "./pages/CookingModePage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AnalyticsListener from "./components/AnalyticsListener";
import { measurementId } from "./firebase";
import useHotjar from "./hooks/useHotjar.js";
import Hotjar from "@hotjar/browser";


function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // czekaj na Firebase zanim cokolwiek wyrenderujesz
  return user ? children : <Navigate to="/login" replace />;
}


export default function App() {
  useEffect(() => {
    if (!measurementId) return;

    ReactGA.initialize(measurementId);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  useHotjar();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid && Hotjar.isReady()) {
      Hotjar.identify(user.uid, {});
    }
  }, [user?.uid]);

  return (
    <BrowserRouter>
      <AnalyticsListener />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/przepis/:id/gotowanie"
          element={<PrivateRoute><CookingModePage /></PrivateRoute>}
        />
        <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route path="/"           element={<Navigate to="/spizarnia" replace />} />
          <Route path="/spizarnia"  element={<SpizarniaPage />} />
          <Route path="/wyniki"     element={<WynikiPage />} />
          <Route path="/profil"     element={<ProfilePage />} />
          <Route path="/przepis/:id" element={<RecipeDetailPage />} />
          <Route path="/zapisane" element={<SavedRecipesPage />} />
          <Route path="/ustawienia" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
