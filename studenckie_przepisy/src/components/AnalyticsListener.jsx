import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function AnalyticsListener() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // pierwszy pageview wysyłamy ręcznie przy inicjalizacji w App.js,
    // więc tutaj pomijamy pierwsze wywołanie, żeby się nie zdublował
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}