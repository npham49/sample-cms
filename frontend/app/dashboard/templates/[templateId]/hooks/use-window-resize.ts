"use client";

import { useState, useEffect } from "react";

// Custom hook for window size
function useWindowSize() {
  let inner = {
    innerWidth: 0,
    innerHeight: 0,
  };

  if (typeof window !== "undefined") {
    inner = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };
  }
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState({
    width: inner.innerWidth,
    height: inner.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
