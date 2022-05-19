import { useEffect, useRef } from "react";

export default function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      return;
    }
  }, []);
}
