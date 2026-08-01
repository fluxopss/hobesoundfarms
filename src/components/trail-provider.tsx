"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TrailContextValue = {
  reducedMotion: boolean;
  gateDone: boolean;
  setGateDone: (v: boolean) => void;
  activeChapter: string;
  setActiveChapter: (id: string) => void;
  scrollTo: (hash: string) => void;
  lenis: Lenis | null;
};

const TrailContext = createContext<TrailContextValue | null>(null);

export function useTrail() {
  const ctx = useContext(TrailContext);
  if (!ctx) throw new Error("useTrail must be used within TrailProvider");
  return ctx;
}

export function TrailProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const [activeChapter, setActiveChapter] = useState("landing");
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);

    const seen = sessionStorage.getItem("hsf-gate-done") === "1";
    if (seen || mq.matches) setGateDone(true);

    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (hash: string) => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    },
    [lenis, reducedMotion],
  );

  const markGateDone = useCallback((v: boolean) => {
    setGateDone(v);
    if (v) sessionStorage.setItem("hsf-gate-done", "1");
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      gateDone,
      setGateDone: markGateDone,
      activeChapter,
      setActiveChapter,
      scrollTo,
      lenis,
    }),
    [reducedMotion, gateDone, markGateDone, activeChapter, scrollTo, lenis],
  );

  return (
    <TrailContext.Provider value={value}>{children}</TrailContext.Provider>
  );
}
