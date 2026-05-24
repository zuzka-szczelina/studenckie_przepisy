import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import SpizarniaScreen from "./screens/SpizarniaScreen";
import WynikiScreen from "./screens/WynikiScreen";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import PlaceholderScreen from "./screens/PlaceholderScreen";
// import OdkrywajScreen from "./screens/OdkrywajScreen";  // TODO
// import ZapisaneScreen from "./screens/ZapisaneScreen";  // TODO

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/"           element={<Navigate to="/spizarnia" replace />} />
          <Route path="/spizarnia"  element={<SpizarniaScreen />} />
          <Route path="/wyniki"     element={<WynikiScreen />} />
          <Route path="/profil"   element={<ProfileScreen />}   />
          <Route
            path="/zapisane"
            element={
              <PlaceholderScreen
                title="Zapisane"
                description="Tutaj pojawią się przepisy, które dodasz do zapisanych."
              />
            }
          />
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
      </Routes>
    </BrowserRouter>
  );
}
