import View from "./view";
import PreviewView from "./preview-view";

import icons from "../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "We could not find that recipe. Please try another one.";
  _message = '';

  _generateMarkup() {
    return this._data.map(result => {
      return PreviewView.render(result, false)
    }).join('');
  };
};

export default new ResultsView();
