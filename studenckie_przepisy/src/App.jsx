import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import SpizarniaScreen from "./screens/SpizarniaScreen";
import WynikiScreen from "./screens/WynikiScreen";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import PlaceholderScreen from "./screens/PlaceholderScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import CookingModeScreen from "./screens/CookingModeScreen";
import { useAuth } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import SavedRecipiesScreen from "./screens/SavedRecipiesScreen.jsx";
// import OdkrywajScreen from "./screens/OdkrywajScreen";  // TODO
// import ZapisaneScreen from "./screens/ZapisaneScreen";  // TODO

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // czekaj na Firebase zanim cokolwiek wyrenderujesz
  return user ? children : <Navigate to="/login" replace />;
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route path="/"           element={<Navigate to="/spizarnia" replace />} />
          <Route path="/spizarnia"  element={<SpizarniaScreen />} />
          <Route path="/wyniki"     element={<WynikiScreen />} />
          <Route path="/profil"   element={<ProfileScreen />}   />
          <Route path="/przepis/:id" element={<RecipeDetailScreen />} />  
          {/* <Route
            path="/zapisane"
            element={
              <PlaceholderScreen
                title="Zapisane"
                description="Tutaj pojawią się przepisy, które dodasz do zapisanych."
              />
            }
          /> */}
          <Route path="/zapisane" element={<SavedRecipiesScreen />} />
          <Route
            path="/ustawienia"
            element={
              <PlaceholderScreen
                title="Ustawienia"
                description="Ustawienia konta i aplikacji będą dostępne w tym miejscu."
              />
            }
          />
          {/* <Route path="/odkrywaj" element={<OdkrywajScreen />} /> */}
          {/* <Route path="/zapisane" element={<ZapisaneScreen />} /> */}
        </Route>
        <Route path="/przepis/:id/gotowanie" element={<CookingModeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
