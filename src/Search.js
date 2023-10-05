import { useRef } from "react";
import useKey from "./hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

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
