const Search = ({query, setQuery}) => {

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default Search;
