"use client";

import { useEffect, useState } from "react";

const MINIMUM_VISIBLE_TIME = 650;
const FADE_OUT_TIME = 380;
const SAFETY_TIMEOUT = 3500;

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let closeTimer;
    let removeTimer;

    const hideLoader = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MINIMUM_VISIBLE_TIME - elapsed);

      closeTimer = window.setTimeout(() => {
        setIsClosing(true);

        removeTimer = window.setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "";
        }, FADE_OUT_TIME);
      }, remaining);
    };

    document.body.style.overflow = "hidden";

    if (document.readyState === "complete") {
      requestAnimationFrame(hideLoader);
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    const safetyTimer = window.setTimeout(() => {
      setIsClosing(true);

      removeTimer = window.setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, FADE_OUT_TIME);
    }, SAFETY_TIMEOUT);

    return () => {
      window.removeEventListener("load", hideLoader);
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="KyroX is loading"
      className={`initial-loader ${isClosing ? "initial-loader--closing" : ""}`}
    >
      <div aria-hidden="true" className="initial-loader__glow" />

      <div className="initial-loader__content">
        <div className="initial-loader__logo-wrap">
          <div className="initial-loader__ring" />
          <div className="initial-loader__ring initial-loader__ring--reverse" />

          <div className="initial-loader__logo">
            <span>K</span>
            <span>X</span>
          </div>
        </div>

        <div className="initial-loader__brand">KYROX™</div>
        <div className="initial-loader__label">Loading policies</div>

        <div className="initial-loader__progress">
          <div className="initial-loader__progress-bar" />
        </div>
      </div>

      <span className="sr-only">Loading KyroX policies…</span>
    </div>
  );
}
