import "./search-result.styles.scss";

const SearchResult = ({ recipe, updateCurrentRecipe }) => {
  const handleClick = async (event) => {
    event.preventDefault();

    await updateCurrentRecipe(recipe);
  }

  return (
    <div className="search-result-container" onClick={ handleClick }>
      <h3>{`${recipe.title}`}</h3>
      <h5>{`${recipe.publisher}`}</h5>
    </div>
  )
};

export default SearchResult;