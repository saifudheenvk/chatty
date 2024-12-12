import {  RefObject, useEffect, useState } from "react";

// To check whether the click is outside the element
const useDetectOutsideClick = (ref: RefObject<HTMLElement>, initialState: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsActive(prevState => !prevState);
      }
    };

    if(isActive) {
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
    };

  }, [ref, isActive]);
  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
