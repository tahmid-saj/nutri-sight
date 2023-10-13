import "./ingredients.styles.scss";

const Ingredients = ({ currentDisplayedRecipe }) => {
  const { ingredients } = currentDisplayedRecipe;

  return (
    <div className="ingredients-container">
      <h2>Recipe Ingredients</h2>

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
