"use client";
import { useCallback, useEffect, useState } from "react";
import { Config, arrayKeys, defaults } from "@/lib/wizard";

const KEY = "mmk-brief-v1";
const LAST = 8;

export function useWizard() {
  const [cfg, setCfg] = useState<Config>(defaults);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY) || localStorage.getItem("mmk_wizard_config");
      if (raw) {
        const p = JSON.parse(raw);
        const configData = p?.cfg || p;
        if (configData && typeof configData === "object") {
          const m: Config = { ...defaults, ...configData };
          for (const k of arrayKeys) if (!Array.isArray(m[k])) m[k] = defaults[k];
          setCfg(m);
          if (Number.isInteger(p.step)) setStep(Math.min(Math.max(p.step, 0), LAST));
        }
      }
    } catch {
      /* corrupted or unavailable storage: fall back to defaults */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ cfg, step }));
      localStorage.setItem("mmk_wizard_config", JSON.stringify(cfg));
    } catch { /* storage unavailable */ }
  }, [cfg, step, ready]);

  const reset = useCallback(() => {
    setCfg(defaults);
    setStep(0);
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem("mmk_wizard_config");
    } catch { /* ignore */ }
  }, []);

  return { cfg, setCfg, step, setStep, ready, reset };
}
