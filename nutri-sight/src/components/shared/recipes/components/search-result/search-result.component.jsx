import "./search-result.styles.scss";

const SearchResult = ({ recipe }) => {
  const handleClick = (event) => {
    event.preventDefault();

    console.log("clicked");
  }

  return (
    <div className="search-result-container" onClick={ handleClick }>
      <h3>{`${recipe.title}`}</h3>
      <h5>{`${recipe.publisher}`}</h5>
    </div>
  )
};

export default SearchResult;