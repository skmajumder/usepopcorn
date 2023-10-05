import { useEffect, useState } from "react";

function useLocalStorage(initialStage, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialStage;
  });

  // * set value to the localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

    return () => {};
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
