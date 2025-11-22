import { useCallback, useEffect, useRef } from "react";

const useDebounceFunction = <TParams extends unknown[], TReturn = void>(
  callback: (...args: TParams) => TReturn,
  delay: number = 500,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: TParams) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};

export { useDebounceFunction };
