import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    function callbackfn(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callbackfn);

    return () => document.removeEventListener("keydown", callbackfn);
  }, [setQuery]);

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search Movies...or Press 'Enter'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
};

export default Search;
