import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const useHotjar = () => {
    useEffect(() => {
        const siteId = 877408;
        const hotjarVersion = 6;
        
        Hotjar.init(siteId, hotjarVersion, {
            debug: true
        });
    }, []);

}

export default useHotjar