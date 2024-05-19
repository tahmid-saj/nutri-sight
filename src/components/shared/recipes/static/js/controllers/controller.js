import * as model from "../models/model";

import { MODAL_CLOSE_SEC } from "../config/config";

import RecipeView from "../views/recipe-view";
import SearchView from "../views/search-view";
import ResultsView from "../views/results-view";
import PaginationView from "../views/pagination-view";
import BookmarksView from "../views/bookmarks-view";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    // 1) update results view to mark selected search result
    ResultsView.update(model.getSearchResultsPage());

    // 2) update bookmarks view
    BookmarksView.update(model.state.bookmarks);

    // 3) loading recipe
    await model.loadRecipe(id);

    // 4) rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // 1) get search query
    const query = SearchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render search results
    ResultsView.render(model.getSearchResultsPage());

    // 4) render pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) render new results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // 2) render new pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add / remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) update recipe view
  RecipeView.update(model.state.recipe);

  // 3) render bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};

init();
