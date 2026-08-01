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

type AcreageContextValue = {
  reducedMotion: boolean;
  entered: boolean;
  setEntered: (v: boolean) => void;
  gateDone: boolean;
  setGateDone: (v: boolean) => void;
  activeMode: string;
  setActiveMode: (id: string) => void;
  scrollTo: (hash: string) => void;
  lenis: Lenis | null;
};

const AcreageContext = createContext<AcreageContextValue | null>(null);

export function useAcreage() {
  const ctx = useContext(AcreageContext);
  if (!ctx) throw new Error("useAcreage must be used within AcreageProvider");
  return ctx;
}

export const useTrail = useAcreage;

export function AcreageProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEnteredState] = useState(false);
  const [activeMode, setActiveMode] = useState("home");
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);

    // Clear legacy skip keys — entrance must show every visit
    sessionStorage.removeItem("hsf-acreage-v2");
    sessionStorage.removeItem("hsf-gate-done");
    sessionStorage.removeItem("hsf-acreage-entered");

    // Always start at top — do not restore prior scroll position
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.2,
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
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    [lenis, reducedMotion],
  );

  const setEntered = useCallback((v: boolean) => {
    setEnteredState(v);
    if (v) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      entered,
      setEntered,
      gateDone: entered,
      setGateDone: setEntered,
      activeMode,
      setActiveMode,
      scrollTo,
      lenis,
    }),
    [reducedMotion, entered, setEntered, activeMode, scrollTo, lenis],
  );

  return (
    <AcreageContext.Provider value={value}>{children}</AcreageContext.Provider>
  );
}

export const TrailProvider = AcreageProvider;
