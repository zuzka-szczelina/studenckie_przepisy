import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import SpizarniaScreen from "./screens/SpizarniaScreen";
// import OdkrywajScreen from "./screens/OdkrywajScreen";  // TODO
// import ZapisaneScreen from "./screens/ZapisaneScreen";  // TODO
// import ProfilScreen   from "./screens/ProfilScreen";    // TODO
// import WynikiScreen   from "./screens/WynikiScreen";    // TODO

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All screens share AppLayout (TopBar + BottomNav) */}
        <Route element={<AppLayout />}>
          <Route path="/"           element={<Navigate to="/spizarnia" replace />} />
          <Route path="/spizarnia"  element={<SpizarniaScreen />} />
          {/* <Route path="/odkrywaj" element={<OdkrywajScreen />} /> */}
          {/* <Route path="/zapisane" element={<ZapisaneScreen />} /> */}
          {/* <Route path="/profil"   element={<ProfilScreen />}   /> */}
          {/* <Route path="/wyniki"   element={<WynikiScreen />}   /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}