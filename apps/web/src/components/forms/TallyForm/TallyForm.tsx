"use client";

import { useEffect } from "react";
import Script from "next/script";

export const TallyForm = () => {
  useEffect(() => {
    // Load Tally embeds after script loads
    const loadTally = () => {
      if (typeof window !== "undefined" && (window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };

    // Check if script is already loaded
    if (typeof window !== "undefined" && (window as any).Tally) {
      loadTally();
    } else {
      // Wait for script to load
      const script = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (script) {
        script.addEventListener("load", loadTally);
      }
    }
  }, []);

  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/npOvZ1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Contact Me"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
    </>
  );
};

