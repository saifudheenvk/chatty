import { useEffect, useRef } from "react";


const useEffectOnce = (callback: () => void) => {
  const called = useRef(false);
  useEffect(() => {
    if (!called.current) {
      called.current = true;
      callback();
    }
  }, [callback]);
};


export default useEffectOnce;
