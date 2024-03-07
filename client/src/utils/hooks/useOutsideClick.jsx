import { useEffect } from "react";

export const useOutsideClick = (wrapperRef, setState) => {
  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setState(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [wrapperRef]);
};
