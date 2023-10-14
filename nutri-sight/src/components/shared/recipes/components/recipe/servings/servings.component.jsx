import { Component, useState } from "react";


import "./servings.styles.scss";

import { ReactComponent as IncreaseServingsButton } from "../../../../../../assets/icons8-plus.svg";


const Servings = ({ currentDisplayedRecipe, updateIngredients }) => {
  const { servings: originalServings, cooking_time: cookingTime } = currentDisplayedRecipe;
  const [updatedServings, setUpdatedServings] = useState(originalServings);
  const [displayNewRecipeServings, setDisplayNewRecipeServings] = useState(true);


  handleDecreaseServings = (event) => {
    event.preventDefault();

    setDisplayNewRecipeServings(false);

    console.log("decrease servings");

    if (updatedServings > 0) {
      setUpdatedServings(updatedServings - 1);
    }

    updateIngredients(originalServings, updatedServings);

  };

  handleIncreaseServings = (event) => {
    event.preventDefault();

    setDisplayNewRecipeServings(false);

    console.log("increase servings");

    setUpdatedServings(updatedServings + 1);

    updateIngredients(originalServings, updatedServings);
  };

  return (
    <div className="servings-container">
      <div className="time-container">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nNXXy2oTcRTH8c+isfUCUoWuBFt9CUGFWt142/gm1p3uuqutdeFCuqqCiqhFEKuohWoJCPoERatPoBUsUi9Q+cOpTIdkMpOQgD/4Q3ImZ77zP3Mu//Af6gre4C6mcA4DvQDP4j1u4hW+YR23MNJt8Gzme9rtBbzET0yjvxfgrFLYV1HH0LYrBTqAyx2Ck/ZjOR5gqNXNduAtHpcA34hVpP54//W4d1Ndx0cMlgDvjdVKaeefI/Mb6jB+4WjOPoydOtMJbDTL9lQGCw3sCfoExzqEv8DtvHEXfmC0iVOC/ol3urtN8El8zzeZ8/iCvgLHBN3EJxxvA9yHrzibNaZif9DCcQ8+BPw3JlCrCH+Eq1nD/byhiY4EdDPWu0i+spqO3v5PrzFe0nkiA05rvgJ4HEtZw1IFcC2GwxY4ha+sLuXB9yIMZTUcO03QgxX8ruVDnbrKQ93XPCbz02StjSytolowTmeNA1HcY10En2rUQEQ7e9pF8DPMNUuYjS7tejROJYea/SBl9krJsVhW+6LjbUuqRoO7Huemor5dJaEW4yRSeBAQx5TVgA92uNPFskefLQ3FzlcKRmWRxiK8y1Wg2bBPRcItxDwtqvNalMzz8JksE94ijUSprcc8Td1nBhdjzYRtLep0rmIb1Uqp8NMQT+PzTky0tNLnZDvTq78wHekvo3tzA9JAndoAAAAASUVORK5CYII="/>
        <h4>{` ${cookingTime} minutes`}</h4>
      </div>

      <div className="servings-quantity-container">
        <div className="servings-buttons-container">
          <img onClick={ handleDecreaseServings } className="decrease-servings" 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVR4nNWXu05CQRCGvwIEO7HATkWfwxvaeH0X9SkQOL2Vl3hJNDQqSoyJSvAdRINvoBRSaGc2+TEnZD3czob4JZtsZncZZpmZf4F/wDCwDuSAY+BRw8yzwBoQD9PhFHAINIB34AzIA5saZn4OfGjPPpDqx2EM8IBv4AJYACIB+81aGrjSmZw+oyvGgCfgGZjp4UvPAS9ABUh24/QNKAEj9E4CuAVqnTiPKdJSm2vtlIicV4ChoI2errefSG2RV5X5VkwmfimJwmZWCTdtWzQlc4k7isCBrTk0HEXbZBH4bG0yG2oOYSTUX0TVZFb9xqy6j2sKwI7fcBqUdSGSV2//5R7YsmwcB3Z7HOZsK9vyNXjHJ2rqrvGAo0ElV8ZvMCJeV8q7Iiofy35jXMVt9NQVS7YGgtqZEXFXXAN7toVJiYSLqOclEuYZZSUnCTNSFhajwGtrUtkeAhWJdySkhLoDyu0eAuiZUpPzRJ+R3nX69GmSVORV/T7dktb1lrtx6r/2rBKuKD0NqvOoSuZGZzKdXG8QKZVaQ3paUOtrPug92eqqU1MyE4RIXCJu9NT02wcNMze2lbD/wjjhB7Mpc2ceMJ5sAAAAAElFTkSuQmCC"/>
          <IncreaseServingsButton onClick={ handleIncreaseServings } 
                                  className="increase-servings"></IncreaseServingsButton>
        </div>

        {
          displayNewRecipeServings &&
          <h4>{` ${originalServings} servings`}</h4>
        }

        {
          !displayNewRecipeServings &&
          <h4>{` ${updatedServings} servings`}</h4>
        }

      </div>
    )
  }
};

class ServingsClass extends Component {
  constructor ({ currentDisplayedRecipe, 
    handleServingsUpdate 
  }) {
    super();

    this.state = {
      currentDisplayedRecipe: currentDisplayedRecipe,
      originalServings: currentDisplayedRecipe.servings,
      updatedServings: currentDisplayedRecipe.servings,
      cookingTime: currentDisplayedRecipe.cooking_time,
      handleServingsUpdate: handleServingsUpdate
    };
  };

  handleDecreaseServings = (event) => {
    event.preventDefault();

    if (this.state.updatedServings > 0) {
      this.setState({ updatedServings: --this.state.updatedServings });
    }
    // this.state.handleServingsUpdate(this.state.originalServings, this.state.updatedServings);
    console.log(`decrease servings ${this.state.updatedServings}`);
  };

  handleIncreaseServings = (event) => {
    event.preventDefault();

    this.setState({ updatedServings: ++this.state.updatedServings });
    // this.state.handleServingsUpdate(this.state.originalServings, this.state.updatedServings);
    console.log(`increase servings ${this.state.updatedServings}`);
  };

  render = () => {
    return (
      <div className="servings-container">
        <div className="time-container">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nNXXy2oTcRTH8c+isfUCUoWuBFt9CUGFWt142/gm1p3uuqutdeFCuqqCiqhFEKuohWoJCPoERatPoBUsUi9Q+cOpTIdkMpOQgD/4Q3ImZ77zP3Mu//Af6gre4C6mcA4DvQDP4j1u4hW+YR23MNJt8Gzme9rtBbzET0yjvxfgrFLYV1HH0LYrBTqAyx2Ck/ZjOR5gqNXNduAtHpcA34hVpP54//W4d1Ndx0cMlgDvjdVKaeefI/Mb6jB+4WjOPoydOtMJbDTL9lQGCw3sCfoExzqEv8DtvHEXfmC0iVOC/ol3urtN8El8zzeZ8/iCvgLHBN3EJxxvA9yHrzibNaZif9DCcQ8+BPw3JlCrCH+Eq1nD/byhiY4EdDPWu0i+spqO3v5PrzFe0nkiA05rvgJ4HEtZw1IFcC2GwxY4ha+sLuXB9yIMZTUcO03QgxX8ruVDnbrKQ93XPCbz02StjSytolowTmeNA1HcY10En2rUQEQ7e9pF8DPMNUuYjS7tejROJYea/SBl9krJsVhW+6LjbUuqRoO7Huemor5dJaEW4yRSeBAQx5TVgA92uNPFskefLQ3FzlcKRmWRxiK8y1Wg2bBPRcItxDwtqvNalMzz8JksE94ijUSprcc8Td1nBhdjzYRtLep0rmIb1Uqp8NMQT+PzTky0tNLnZDvTq78wHekvo3tzA9JAndoAAAAASUVORK5CYII="/>
          <h4>{` ${this.state.cookingTime} minutes`}</h4>
        </div>

        <div className="servings-quantity-container">
          <div className="servings-buttons-container">
            <img onClick={ this.handleDecreaseServings } className="decrease-servings" 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVR4nNWXu05CQRCGvwIEO7HATkWfwxvaeH0X9SkQOL2Vl3hJNDQqSoyJSvAdRINvoBRSaGc2+TEnZD3czob4JZtsZncZZpmZf4F/wDCwDuSAY+BRw8yzwBoQD9PhFHAINIB34AzIA5saZn4OfGjPPpDqx2EM8IBv4AJYACIB+81aGrjSmZw+oyvGgCfgGZjp4UvPAS9ABUh24/QNKAEj9E4CuAVqnTiPKdJSm2vtlIicV4ChoI2errefSG2RV5X5VkwmfimJwmZWCTdtWzQlc4k7isCBrTk0HEXbZBH4bG0yG2oOYSTUX0TVZFb9xqy6j2sKwI7fcBqUdSGSV2//5R7YsmwcB3Z7HOZsK9vyNXjHJ2rqrvGAo0ElV8ZvMCJeV8q7Iiofy35jXMVt9NQVS7YGgtqZEXFXXAN7toVJiYSLqOclEuYZZSUnCTNSFhajwGtrUtkeAhWJdySkhLoDyu0eAuiZUpPzRJ+R3nX69GmSVORV/T7dktb1lrtx6r/2rBKuKD0NqvOoSuZGZzKdXG8QKZVaQ3paUOtrPug92eqqU1MyE4RIXCJu9NT02wcNMze2lbD/wjjhB7Mpc2ceMJ5sAAAAAElFTkSuQmCC"/>
            <IncreaseServingsButton onClick={ this.handleIncreaseServings } 
                                    className="increase-servings"></IncreaseServingsButton>
          </div>
            <h4>{` ${this.state.updatedServings === this.state.originalServings ? 
                    this.state.originalServings : this.state.updatedServings} servings`}</h4>
        </div>
        
      </div>
    )
  };
}

export default Servings;