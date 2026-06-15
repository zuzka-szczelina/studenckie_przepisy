import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const useHotjar = () => {
  useEffect(() => {
    const siteId = Number(import.meta.env.VITE_HOTJAR_SITE_ID ?? 877408);
    const hotjarVersion = 6;

    if (!siteId || Hotjar.isReady()) return;

    Hotjar.init(siteId, hotjarVersion);
  }, []);
};

export default useHotjar
