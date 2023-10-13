import "./ingredients.styles.scss";

const Ingredients = () => {
  return (
    <div className="ingredients-container">
      <h2>Recipe Ingredients</h2>

      <div className="ingredient-quantities-container">
        <h4>{`${"3 cups bread flour"}`}</h4>
        <h4>{`${"3 cups bread flour"}`}</h4>
        <h4>{`${"3 cups bread flour"}`}</h4>
        <h4>{`${"3 cups bread flour"}`}</h4>
      </div>
    </div>
  )
};

export default Ingredients;
