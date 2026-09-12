import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

export default function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const rafId = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const key = location.pathname;

    function handleScroll() {
      scrollPositions.set(key, window.scrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (navigationType === "POP" && scrollPositions.has(key)) {
      const savedY = scrollPositions.get(key);
      let attempts = 0;

      function tryRestore() {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (savedY <= maxScroll || attempts > 30) {
          window.scrollTo(0, Math.min(savedY, maxScroll));
          return;
        }

        attempts += 1;
        rafId.current = requestAnimationFrame(tryRestore);
      }

      tryRestore();
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [location.pathname, navigationType]);
}
