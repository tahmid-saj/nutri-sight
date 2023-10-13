import "./ingredients.styles.scss";

const Ingredients = ({ currentDisplayedRecipe, currentDisplayedRecipeName }) => {
  const { ingredients } = currentDisplayedRecipe;

  return (
    <div className="ingredients-container">
      <h2>Recipe Ingredients</h2>
      <h3>{`${currentDisplayedRecipeName}`}</h3>

      <div className="ingredient-quantities-container">
        {
          ingredients.map((ingredient, index) => {
            return (
              <h4 key={ index }>{`${ingredient.quantity !== null ? ingredient.quantity : ""} ${ingredient.unit} ${ingredient.description}`}</h4>
            )
          })
        }


      </div>
    </div>
  )
};

export default Ingredients;
