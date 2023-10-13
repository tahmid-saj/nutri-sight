import "./search-result.styles.scss";

const SearchResult = () => {
  const handleClick = (event) => {
    event.preventDefault();

    console.log("clicked");
  }

  return (
    <div className="search-result-container" onClick={ handleClick }>
      <h3>{`Pizza`}</h3>
    </div>
  )
};

export default SearchResult;