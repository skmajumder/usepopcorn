import { useEffect } from "react";

function useKey(key, action) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
}

export default useKey;
