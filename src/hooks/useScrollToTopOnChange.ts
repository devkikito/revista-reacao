"use client";
import { useEffect } from "react";

export function useScrollToTopOnChange(dependencies: any[]) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
