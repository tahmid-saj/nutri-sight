# [nutritiontracker.io](https://www.nutritiontracker.io/)
<br>

Nutrition tracker developed to provide predicted nutrition info via image / food description, keep track of meal consumption and burned calories. Also provides numerous recipes and their nutrition info. Developed using MERN, Firebase, Django, GraphQL, Redis, Postgresql, and ML based APIs.
<br>
<br>

The structure of the codebase is as follows:

```
nutri-sight/
├── Dockerfile
├── package-lock.json
├── package.json
├── public/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── site.webmanifest
├── README.md
├── src/
│   ├── App.js
│   ├── App.test.js
│   ├── assets/
│   │   ├── add-micronutrients.svg
│   │   ├── close-button.svg
│   │   ├── icons8-minus-30.png
│   │   └── icons8-plus.svg
│   ├── components/
│   │   ├── shared/
│   │   │   ├── about-links/
│   │   │   │   ├── about-links.component.jsx
│   │   │   │   └── about-links.styles.scss
│   │   │   ├── button/
│   │   │   │   ├── button.component.jsx
│   │   │   │   ├── button.styles.jsx
│   │   │   │   └── button.styles.scss
│   │   │   ├── chatbot/
│   │   │   │   └── chatbot-response/
│   │   │   │       ├── chatbot-response.component.jsx
│   │   │   │       ├── chatbot-response.styles.jsx
│   │   │   │       └── chatbot-response.styles.scss
│   │   │   ├── drop-button/
│   │   │   │   └── drop-button.styles.jsx
│   │   │   ├── form-input/
│   │   │   │   ├── form-input.component.jsx
│   │   │   │   ├── form-input.styles.jsx
│   │   │   │   └── form-input.styles.scss
│   │   │   ├── mui/
│   │   │   │   ├── card/
│   │   │   │   │   ├── card.component.jsx
│   │   │   │   │   └── card.styles.scss
│   │   │   │   ├── drawer/
│   │   │   │   │   ├── drawer.component.jsx
│   │   │   │   │   └── drawer.styles.scss
│   │   │   │   ├── hidden-drawer/
│   │   │   │   │   ├── hidden-drawer.component.jsx
│   │   │   │   │   └── hidden-drawer.styles.scss
│   │   │   │   ├── media-card/
│   │   │   │   │   ├── media-card.component.jsx
│   │   │   │   │   └── media-card.styles.jsx
│   │   │   │   ├── paper/
│   │   │   │   │   ├── paper.component.jsx
│   │   │   │   │   └── paper.styles.scss
│   │   │   │   ├── responsive-drawer/
│   │   │   │   │   ├── responsive-drawer.component.jsx
│   │   │   │   │   └── responsive-drawer.styles.scss
│   │   │   │   └── tabs/
│   │   │   │       ├── tabs.component.jsx
│   │   │   │       └── tabs.styles.scss
│   │   │   ├── nutrient-predictor/
│   │   │   │   ├── nutrients-info/
│   │   │   │   │   ├── nutrients-info.component.jsx
│   │   │   │   │   ├── nutrients-info.styles.jsx
│   │   │   │   │   └── nutrients-info.styles.scss
│   │   │   │   └── upload-food-image/
│   │   │   │       ├── detect-nutrients/
│   │   │   │       │   ├── detect-nutrients.component.jsx
│   │   │   │       │   └── detect-nutrients.styles.scss
│   │   │   │       ├── upload-food-image.component.jsx
│   │   │   │       ├── upload-food-image.styles.scss
│   │   │   │       └── upload-image/
│   │   │   │           ├── upload-image.component.jsx
│   │   │   │           ├── upload-image.styles.jsx
│   │   │   │           └── upload-image.styles.scss
│   │   │   ├── recipes/
│   │   │   │   ├── components/
│   │   │   │   │   ├── bookmark-icon/
│   │   │   │   │   │   ├── bookmark-icon.component.jsx
│   │   │   │   │   │   └── bookmark-icon.styles.scss
│   │   │   │   │   ├── bookmarks/
│   │   │   │   │   │   ├── bookmarks.component.jsx
│   │   │   │   │   │   └── bookmarks.styles.scss
│   │   │   │   │   ├── header/
│   │   │   │   │   │   ├── header.component.jsx
│   │   │   │   │   │   ├── header.styles.jsx
│   │   │   │   │   │   └── header.styles.scss
│   │   │   │   │   ├── navigation/
│   │   │   │   │   │   ├── navigation.component.jsx
│   │   │   │   │   │   └── navigation.styles.scss
│   │   │   │   │   ├── pagination/
│   │   │   │   │   │   ├── pagination.component.jsx
│   │   │   │   │   │   ├── pagination.styles.jsx
│   │   │   │   │   │   └── pagination.styles.scss
│   │   │   │   │   ├── recipe/
│   │   │   │   │   │   ├── ingredients/
│   │   │   │   │   │   │   ├── ingredients.component.jsx
│   │   │   │   │   │   │   ├── ingredients.styles.jsx
│   │   │   │   │   │   │   └── ingredients.styles.scss
│   │   │   │   │   │   ├── nutrient-prediction/
│   │   │   │   │   │   │   ├── nutrient-prediction.component.jsx
│   │   │   │   │   │   │   └── nutrient-prediction.styles.jsx
│   │   │   │   │   │   ├── recipe.component.jsx
│   │   │   │   │   │   ├── recipe.styles.jsx
│   │   │   │   │   │   ├── recipe.styles.scss
│   │   │   │   │   │   └── servings/
│   │   │   │   │   │       ├── servings.component.jsx
│   │   │   │   │   │       ├── servings.styles.jsx
│   │   │   │   │   │       └── servings.styles.scss
│   │   │   │   │   ├── recipes-view/
│   │   │   │   │   │   ├── recipes-view.component.jsx
│   │   │   │   │   │   └── recipes-view.styles.scss
│   │   │   │   │   ├── search/
│   │   │   │   │   │   ├── search.component.jsx
│   │   │   │   │   │   └── search.styles.scss
│   │   │   │   │   ├── search-result/
│   │   │   │   │   │   ├── search-result.component.jsx
│   │   │   │   │   │   ├── search-result.styles.jsx
│   │   │   │   │   │   └── search-result.styles.scss
│   │   │   │   │   └── search-results/
│   │   │   │   │       ├── search-results.component.jsx
│   │   │   │   │       ├── search-results.styles.jsx
│   │   │   │   │       └── search-results.styles.scss
│   │   │   │   ├── recipes.component.jsx
│   │   │   │   └── static/
│   │   │   │       ├── img/
│   │   │   │       │   ├── favicon.png
│   │   │   │       │   └── icons.svg
│   │   │   │       ├── js/
│   │   │   │       │   ├── config/
│   │   │   │       │   │   └── config.js
│   │   │   │       │   ├── controllers/
│   │   │   │       │   │   └── controller.js
│   │   │   │       │   ├── helpers/
│   │   │   │       │   │   └── helpers.js
│   │   │   │       │   ├── models/
│   │   │   │       │   │   └── model.js
│   │   │   │       │   └── views/
│   │   │   │       │       ├── bookmarks-view.js
│   │   │   │       │       ├── pagination-view.js
│   │   │   │       │       ├── preview-view.js
│   │   │   │       │       ├── recipe-view.js
│   │   │   │       │       ├── results-view.js
│   │   │   │       │       ├── search-view.js
│   │   │   │       │       └── view.js
│   │   │   │       ├── sass/
│   │   │   │       │   ├── main.scss
│   │   │   │       │   ├── _base.scss
│   │   │   │       │   ├── _components.scss
│   │   │   │       │   ├── _header.scss
│   │   │   │       │   ├── _preview.scss
│   │   │   │       │   ├── _recipe.scss
│   │   │   │       │   ├── _searchResults.scss
│   │   │   │       │   └── _upload.scss
│   │   │   │       └── templates/
│   │   │   │           └── template.html
│   │   │   └── responsive-buttons-container/
│   │   │       ├── responsive-buttons-container.component.jsx
│   │   │       └── responsive-buttons-container.styles.jsx
│   │   ├── signed-in/
│   │   │   ├── calories-burned/
│   │   │   │   ├── activity-date-filter/
│   │   │   │   │   ├── activity-date-filter.component.jsx
│   │   │   │   │   ├── activity-date-filter.styles.jsx
│   │   │   │   │   └── activity-date-filter.styles.scss
│   │   │   │   ├── add-activity/
│   │   │   │   │   ├── activity-date-form/
│   │   │   │   │   │   ├── activity-date-form.component.jsx
│   │   │   │   │   │   ├── activity-date-form.styles.jsx
│   │   │   │   │   │   └── activity-date-form.styles.scss
│   │   │   │   │   └── activity-date-table/
│   │   │   │   │       ├── activity-date-table.component.jsx
│   │   │   │   │       ├── activity-date-table.styles.jsx
│   │   │   │   │       └── activity-date-table.styles.scss
│   │   │   │   ├── schedule/
│   │   │   │   │   ├── schedule-calendar/
│   │   │   │   │   │   ├── schedule-calendar.component.jsx
│   │   │   │   │   │   ├── schedule-calendar.styles.jsx
│   │   │   │   │   │   └── schedule-calendar.styles.scss
│   │   │   │   │   └── schedule-day-info/
│   │   │   │   │       ├── schedule-day-info.component.jsx
│   │   │   │   │       ├── schedule-day-info.styles.jsx
│   │   │   │   │       └── schedule-day-info.styles.scss
│   │   │   │   ├── summary/
│   │   │   │   │   └── summary-info/
│   │   │   │   │       ├── summary-info.component.jsx
│   │   │   │   │       ├── summary-info.styles.jsx
│   │   │   │   │       └── summary-info.styles.scss
│   │   │   │   └── view/
│   │   │   │       ├── calories-burned-graph/
│   │   │   │       │   ├── calories-burned-graph-line.component.jsx
│   │   │   │       │   ├── calories-burned-graph-line.styles.jsx
│   │   │   │       │   ├── calories-burned-graph-line.styles.scss
│   │   │   │       │   ├── calories-burned-graph-pie.component.jsx
│   │   │   │       │   ├── calories-burned-graph-pie.styles.jsx
│   │   │   │       │   └── calories-burned-graph-pie.styles.scss
│   │   │   │       └── calories-burned-table/
│   │   │   │           ├── calories-burned-table.component.jsx
│   │   │   │           ├── calories-burned-table.styles.jsx
│   │   │   │           └── calories-burned-table.styles.scss
│   │   │   ├── dashboard/
│   │   │   │   ├── calories-burned/
│   │   │   │   │   ├── calories-burned-graph/
│   │   │   │   │   │   ├── calories-burned-graph-pie.component.jsx
│   │   │   │   │   │   ├── calories-burned-graph-pie.styles.jsx
│   │   │   │   │   │   ├── calories-burned-graph-pie.styles.scss
│   │   │   │   │   │   ├── calories-burned-graph.component.jsx
│   │   │   │   │   │   ├── calories-burned-graph.styles.jsx
│   │   │   │   │   │   └── calories-burned-graph.styles.scss
│   │   │   │   │   ├── calories-burned-summary/
│   │   │   │   │   │   ├── calories-burned-summary.component.jsx
│   │   │   │   │   │   ├── calories-burned-summary.styles.jsx
│   │   │   │   │   │   └── calories-burned-summary.styles.scss
│   │   │   │   │   └── schedule/
│   │   │   │   │       ├── schedule-calendar/
│   │   │   │   │       │   ├── schedule-calendar.component.jsx
│   │   │   │   │       │   ├── schedule-calendar.styles.jsx
│   │   │   │   │       │   └── schedule-calendar.styles.scss
│   │   │   │   │       └── schedule-day-info/
│   │   │   │   │           ├── schedule-day-info.component.jsx
│   │   │   │   │           ├── schedule-day-info.styles.jsx
│   │   │   │   │           └── schedule-day-info.styles.scss
│   │   │   │   ├── fitness/
│   │   │   │   │   ├── schedule/
│   │   │   │   │   │   ├── schedule-calendar/
│   │   │   │   │   │   │   ├── schedule-calendar.component.jsx
│   │   │   │   │   │   │   ├── schedule-calendar.styles.jsx
│   │   │   │   │   │   │   └── schedule-calendar.styles.scss
│   │   │   │   │   │   └── schedule-day-info/
│   │   │   │   │   │       ├── schedule-day-info.component.jsx
│   │   │   │   │   │       ├── schedule-day-info.styles.jsx
│   │   │   │   │   │       └── schedule-day-info.styles.scss
│   │   │   │   │   └── upcoming-exercises/
│   │   │   │   │       ├── upcoming-exercises.component.jsx
│   │   │   │   │       └── upcoming-exercises.styles.jsx
│   │   │   │   └── nutrition-tracker/
│   │   │   │       ├── nutrition-tracker-graph-calories/
│   │   │   │       │   ├── nutrition-tracker-graph-calories.component.jsx
│   │   │   │       │   ├── nutrition-tracker-graph-calories.styles.jsx
│   │   │   │       │   └── nutrition-tracker-graph-calories.styles.scss
│   │   │   │       ├── nutrition-tracker-graph-macronutrients/
│   │   │   │       │   ├── nutrition-tracker-graph-macronutrients.component.jsx
│   │   │   │       │   ├── nutrition-tracker-graph-macronutrients.styles.jsx
│   │   │   │       │   └── nutrition-tracker-graph-macronutrients.styles.scss
│   │   │   │       ├── nutrition-tracker-summary/
│   │   │   │       │   ├── nutrition-tracker-graph-pie/
│   │   │   │       │   │   ├── nutrition-tracker-graph-pie.component.jsx
│   │   │   │       │   │   ├── nutrition-tracker-graph-pie.styles.jsx
│   │   │   │       │   │   └── nutrition-tracker-graph-pie.styles.scss
│   │   │   │       │   ├── nutrition-tracker-summary.component.jsx
│   │   │   │       │   ├── nutrition-tracker-summary.styles.jsx
│   │   │   │       │   └── nutrition-tracker-summary.styles.scss
│   │   │   │       └── schedule/
│   │   │   │           ├── schedule-calendar/
│   │   │   │           │   ├── schedule-calendar.component.jsx
│   │   │   │           │   ├── schedule-calendar.styles.jsx
│   │   │   │           │   └── schedule-calendar.styles.scss
│   │   │   │           └── schedule-day-info/
│   │   │   │               ├── schedule-day-info.component.jsx
│   │   │   │               ├── schedule-day-info.styles.jsx
│   │   │   │               └── schedule-day-info.styles.scss
│   │   │   ├── fitness/
│   │   │   │   ├── add-exercise-form/
│   │   │   │   │   ├── add-exercise-form-info/
│   │   │   │   │   │   ├── add-exercise-form-info.component.jsx
│   │   │   │   │   │   └── add-exercise-form-info.styles.scss
│   │   │   │   │   ├── add-exercise-form.component.jsx
│   │   │   │   │   ├── add-exercise-form.styles.jsx
│   │   │   │   │   └── add-exercise-form.styles.scss
│   │   │   │   ├── schedule/
│   │   │   │   │   ├── schedule-calendar/
│   │   │   │   │   │   ├── schedule-calendar.component.jsx
│   │   │   │   │   │   ├── schedule-calendar.styles.jsx
│   │   │   │   │   │   └── schedule-calendar.styles.scss
│   │   │   │   │   └── schedule-day-info/
│   │   │   │   │       ├── schedule-day-info.component.jsx
│   │   │   │   │       ├── schedule-day-info.styles.jsx
│   │   │   │   │       └── schedule-day-info.styles.scss
│   │   │   │   ├── search-exercise-form/
│   │   │   │   │   ├── search-exercise-form.component.jsx
│   │   │   │   │   ├── search-exercise-form.styles.jsx
│   │   │   │   │   └── search-exercise-form.styles.scss
│   │   │   │   ├── search-exercise-result/
│   │   │   │   │   ├── search-exercise-result.component.jsx
│   │   │   │   │   ├── search-exercise-result.styles.jsx
│   │   │   │   │   └── search-exercise-result.styles.scss
│   │   │   │   ├── search-exercise-results/
│   │   │   │   │   ├── search-exercise-results.component.jsx
│   │   │   │   │   ├── search-exercise-results.styles.jsx
│   │   │   │   │   └── search-exercise-results.styles.scss
│   │   │   │   └── upcoming-exercises/
│   │   │   │       ├── upcoming-exercises.component.jsx
│   │   │   │       └── upcoming-exercises.styles.jsx
│   │   │   └── nutrition-tracker/
│   │   │       ├── add-micronutrients/
│   │   │       │   ├── add-micronutrients.component.jsx
│   │   │       │   ├── add-micronutrients.styles.jsx
│   │   │       │   └── add-micronutrients.styles.scss
│   │   │       ├── calories-graph/
│   │   │       │   ├── calories-graph.component.jsx
│   │   │       │   ├── calories-graph.styles.jsx
│   │   │       │   └── calories-graph.styles.scss
│   │   │       ├── consumption-info/
│   │   │       │   ├── consumption-info.component.jsx
│   │   │       │   └── consumption-info.styles.scss
│   │   │       ├── nutrition-tracker-filter/
│   │   │       │   ├── nutrition-tracker-filter.component.jsx
│   │   │       │   ├── nutrition-tracker-filter.styles.jsx
│   │   │       │   └── nutrition-tracker-filter.styles.scss
│   │   │       ├── nutrition-tracker-table/
│   │   │       │   ├── nutrition-tracker-table.component.jsx
│   │   │       │   ├── nutrition-tracker-table.styles.jsx
│   │   │       │   └── nutrition-tracker-table.styles.scss
│   │   │       ├── schedule/
│   │   │       │   ├── schedule-calendar/
│   │   │       │   │   ├── schedule-calendar.component.jsx
│   │   │       │   │   ├── schedule-calendar.styles.jsx
│   │   │       │   │   └── schedule-calendar.styles.scss
│   │   │       │   └── schedule-day-info/
│   │   │       │       ├── schedule-day-info.component.jsx
│   │   │       │       ├── schedule-day-info.styles.jsx
│   │   │       │       └── schedule-day-info.styles.scss
│   │   │       ├── search-days/
│   │   │       │   ├── search-days.component.jsx
│   │   │       │   └── search-days.styles.scss
│   │   │       ├── summary/
│   │   │       │   ├── summary.component.jsx
│   │   │       │   ├── summary.styles.jsx
│   │   │       │   └── summary.styles.scss
│   │   │       ├── summary-graph/
│   │   │       │   ├── summary-graph.component.jsx
│   │   │       │   ├── summary-graph.styles.jsx
│   │   │       │   └── summary-graph.styles.scss
│   │   │       ├── top-search/
│   │   │       │   ├── top-search.component.jsx
│   │   │       │   ├── top-search.styles.jsx
│   │   │       │   └── top-search.styles.scss
│   │   │       └── update-consumption-form/
│   │   │           ├── update-consumption-form.component.jsx
│   │   │           ├── update-consumption-form.styles.jsx
│   │   │           └── update-consumption-form.styles.scss
│   │   └── signed-out/
│   │       ├── calories-burned/
│   │       │   ├── activity-date-filter/
│   │       │   │   ├── activity-date-filter.component.jsx
│   │       │   │   ├── activity-date-filter.styles.jsx
│   │       │   │   └── activity-date-filter.styles.scss
│   │       │   ├── add-activity/
│   │       │   │   ├── activity-date-form/
│   │       │   │   │   ├── activity-date-form.component.jsx
│   │       │   │   │   ├── activity-date-form.styles.jsx
│   │       │   │   │   └── activity-date-form.styles.scss
│   │       │   │   └── activity-date-table/
│   │       │   │       ├── activity-date-table.component.jsx
│   │       │   │       ├── activity-date-table.styles.jsx
│   │       │   │       └── activity-date-table.styles.scss
│   │       │   ├── schedule/
│   │       │   │   ├── schedule-calendar/
│   │       │   │   │   ├── schedule-calendar.component.jsx
│   │       │   │   │   ├── schedule-calendar.styles.jsx
│   │       │   │   │   └── schedule-calendar.styles.scss
│   │       │   │   └── schedule-day-info/
│   │       │   │       ├── schedule-day-info.component.jsx
│   │       │   │       ├── schedule-day-info.styles.jsx
│   │       │   │       └── schedule-day-info.styles.scss
│   │       │   ├── summary/
│   │       │   │   └── summary-info/
│   │       │   │       ├── summary-info.component.jsx
│   │       │   │       ├── summary-info.styles.jsx
│   │       │   │       └── summary-info.styles.scss
│   │       │   └── view/
│   │       │       ├── calories-burned-graph/
│   │       │       │   ├── calories-burned-graph-line.component.jsx
│   │       │       │   ├── calories-burned-graph-line.styles.jsx
│   │       │       │   ├── calories-burned-graph-line.styles.scss
│   │       │       │   ├── calories-burned-graph-pie.component.jsx
│   │       │       │   ├── calories-burned-graph-pie.styles.jsx
│   │       │       │   └── calories-burned-graph-pie.styles.scss
│   │       │       └── calories-burned-table/
│   │       │           ├── calories-burned-table.component.jsx
│   │       │           ├── calories-burned-table.styles.jsx
│   │       │           └── calories-burned-table.styles.scss
│   │       ├── dashboard/
│   │       │   ├── calories-burned/
│   │       │   │   ├── calories-burned-graph/
│   │       │   │   │   ├── calories-burned-graph-pie.component.jsx
│   │       │   │   │   ├── calories-burned-graph-pie.styles.jsx
│   │       │   │   │   ├── calories-burned-graph-pie.styles.scss
│   │       │   │   │   ├── calories-burned-graph.component.jsx
│   │       │   │   │   ├── calories-burned-graph.styles.jsx
│   │       │   │   │   └── calories-burned-graph.styles.scss
│   │       │   │   ├── calories-burned-summary/
│   │       │   │   │   ├── calories-burned-summary.component.jsx
│   │       │   │   │   ├── calories-burned-summary.styles.jsx
│   │       │   │   │   └── calories-burned-summary.styles.scss
│   │       │   │   └── schedule/
│   │       │   │       ├── schedule-calendar/
│   │       │   │       │   ├── schedule-calendar.component.jsx
│   │       │   │       │   ├── schedule-calendar.styles.jsx
│   │       │   │       │   └── schedule-calendar.styles.scss
│   │       │   │       └── schedule-day-info/
│   │       │   │           ├── schedule-day-info.component.jsx
│   │       │   │           ├── schedule-day-info.styles.jsx
│   │       │   │           └── schedule-day-info.styles.scss
│   │       │   ├── fitness/
│   │       │   │   ├── schedule/
│   │       │   │   │   ├── schedule-calendar/
│   │       │   │   │   │   ├── schedule-calendar.component.jsx
│   │       │   │   │   │   ├── schedule-calendar.styles.jsx
│   │       │   │   │   │   └── schedule-calendar.styles.scss
│   │       │   │   │   └── schedule-day-info/
│   │       │   │   │       ├── schedule-day-info.component.jsx
│   │       │   │   │       ├── schedule-day-info.styles.jsx
│   │       │   │   │       └── schedule-day-info.styles.scss
│   │       │   │   └── upcoming-exercises/
│   │       │   │       ├── upcoming-exercises.component.jsx
│   │       │   │       └── upcoming-exercises.styles.jsx
│   │       │   └── nutrition-tracker/
│   │       │       ├── nutrition-tracker-graph-calories/
│   │       │       │   ├── nutrition-tracker-graph-calories.component.jsx
│   │       │       │   ├── nutrition-tracker-graph-calories.styles.jsx
│   │       │       │   └── nutrition-tracker-graph-calories.styles.scss
│   │       │       ├── nutrition-tracker-graph-macronutrients/
│   │       │       │   ├── nutrition-tracker-graph-macronutrients.component.jsx
│   │       │       │   ├── nutrition-tracker-graph-macronutrients.styles.jsx
│   │       │       │   └── nutrition-tracker-graph-macronutrients.styles.scss
│   │       │       ├── nutrition-tracker-summary/
│   │       │       │   ├── nutrition-tracker-graph-pie/
│   │       │       │   │   ├── nutrition-tracker-graph-pie.component.jsx
│   │       │       │   │   ├── nutrition-tracker-graph-pie.styles.jsx
│   │       │       │   │   └── nutrition-tracker-graph-pie.styles.scss
│   │       │       │   ├── nutrition-tracker-summary.component.jsx
│   │       │       │   ├── nutrition-tracker-summary.styles.jsx
│   │       │       │   └── nutrition-tracker-summary.styles.scss
│   │       │       └── schedule/
│   │       │           ├── schedule-calendar/
│   │       │           │   ├── schedule-calendar.component.jsx
│   │       │           │   ├── schedule-calendar.styles.jsx
│   │       │           │   └── schedule-calendar.styles.scss
│   │       │           └── schedule-day-info/
│   │       │               ├── schedule-day-info.component.jsx
│   │       │               ├── schedule-day-info.styles.jsx
│   │       │               └── schedule-day-info.styles.scss
│   │       ├── fitness/
│   │       │   ├── add-exercise-form/
│   │       │   │   ├── add-exercise-form-info/
│   │       │   │   │   ├── add-exercise-form-info.component.jsx
│   │       │   │   │   └── add-exercise-form-info.styles.scss
│   │       │   │   ├── add-exercise-form.component.jsx
│   │       │   │   ├── add-exercise-form.styles.jsx
│   │       │   │   └── add-exercise-form.styles.scss
│   │       │   ├── schedule/
│   │       │   │   ├── schedule-calendar/
│   │       │   │   │   ├── schedule-calendar.component.jsx
│   │       │   │   │   ├── schedule-calendar.styles.jsx
│   │       │   │   │   └── schedule-calendar.styles.scss
│   │       │   │   └── schedule-day-info/
│   │       │   │       ├── schedule-day-info.component.jsx
│   │       │   │       ├── schedule-day-info.styles.jsx
│   │       │   │       └── schedule-day-info.styles.scss
│   │       │   ├── search-exercise-form/
│   │       │   │   ├── search-exercise-form.component.jsx
│   │       │   │   ├── search-exercise-form.styles.jsx
│   │       │   │   └── search-exercise-form.styles.scss
│   │       │   ├── search-exercise-result/
│   │       │   │   ├── search-exercise-result.component.jsx
│   │       │   │   ├── search-exercise-result.styles.jsx
│   │       │   │   └── search-exercise-result.styles.scss
│   │       │   ├── search-exercise-results/
│   │       │   │   ├── search-exercise-results.component.jsx
│   │       │   │   ├── search-exercise-results.styles.jsx
│   │       │   │   └── search-exercise-results.styles.scss
│   │       │   └── upcoming-exercises/
│   │       │       ├── upcoming-exercises.component.jsx
│   │       │       └── upcoming-exercises.styles.jsx
│   │       ├── nutrition-tracker/
│   │       │   ├── add-micronutrients/
│   │       │   │   ├── add-micronutrients.component.jsx
│   │       │   │   ├── add-micronutrients.styles.jsx
│   │       │   │   └── add-micronutrients.styles.scss
│   │       │   ├── calories-graph/
│   │       │   │   ├── calories-graph.component.jsx
│   │       │   │   ├── calories-graph.styles.jsx
│   │       │   │   └── calories-graph.styles.scss
│   │       │   ├── consumption-info/
│   │       │   │   ├── consumption-info.component.jsx
│   │       │   │   └── consumption-info.styles.scss
│   │       │   ├── nutrition-tracker-filter/
│   │       │   │   ├── nutrition-tracker-filter.component.jsx
│   │       │   │   ├── nutrition-tracker-filter.styles.jsx
│   │       │   │   └── nutrition-tracker-filter.styles.scss
│   │       │   ├── nutrition-tracker-table/
│   │       │   │   ├── nutrition-tracker-table.component.jsx
│   │       │   │   ├── nutrition-tracker-table.styles.jsx
│   │       │   │   └── nutrition-tracker-table.styles.scss
│   │       │   ├── schedule/
│   │       │   │   ├── schedule-calendar/
│   │       │   │   │   ├── schedule-calendar.component.jsx
│   │       │   │   │   ├── schedule-calendar.styles.jsx
│   │       │   │   │   └── schedule-calendar.styles.scss
│   │       │   │   └── schedule-day-info/
│   │       │   │       ├── schedule-day-info.component.jsx
│   │       │   │       ├── schedule-day-info.styles.jsx
│   │       │   │       └── schedule-day-info.styles.scss
│   │       │   ├── search-days/
│   │       │   │   ├── search-days.component.jsx
│   │       │   │   └── search-days.styles.scss
│   │       │   ├── summary/
│   │       │   │   ├── summary.component.jsx
│   │       │   │   ├── summary.styles.jsx
│   │       │   │   └── summary.styles.scss
│   │       │   ├── summary-graph/
│   │       │   │   ├── summary-graph.component.jsx
│   │       │   │   ├── summary-graph.styles.jsx
│   │       │   │   └── summary-graph.styles.scss
│   │       │   ├── top-search/
│   │       │   │   ├── top-search.component.jsx
│   │       │   │   ├── top-search.styles.jsx
│   │       │   │   └── top-search.styles.scss
│   │       │   └── update-consumption-form/
│   │       │       ├── update-consumption-form.component.jsx
│   │       │       ├── update-consumption-form.styles.jsx
│   │       │       └── update-consumption-form.styles.scss
│   │       ├── sign-in-form/
│   │       │   ├── sign-in-form.component.jsx
│   │       │   ├── sign-in-form.styles.jsx
│   │       │   └── sign-in-form.styles.scss
│   │       └── sign-up-form/
│   │           ├── sign-up-form.component.jsx
│   │           ├── sign-up-form.styles.jsx
│   │           └── sign-up-form.styles.scss
│   ├── contexts/
│   │   ├── shared/
│   │   │   ├── chatbot/
│   │   │   │   ├── chatbot.context.tsx
│   │   │   │   └── chatbot.types.ts
│   │   │   ├── nutrient-predictor/
│   │   │   │   ├── nutrient-predictor.context.tsx
│   │   │   │   └── nutrient-predictor.types.ts
│   │   │   ├── recipes/
│   │   │   │   ├── recipes.context.tsx
│   │   │   │   └── recipes.types.ts
│   │   │   └── user/
│   │   │       ├── user.context.tsx
│   │   │       └── user.types.tsx
│   │   ├── signed-in/
│   │   │   ├── calories-burned/
│   │   │   │   └── calories-burned.context.js
│   │   │   ├── fitness/
│   │   │   │   └── fitness.context.js
│   │   │   └── nutrition-tracker/
│   │   │       └── nutrition-tracker.context.js
│   │   └── signed-out/
│   │       ├── calories-burned/
│   │       │   ├── calories-burned.context.tsx
│   │       │   └── calories-burned.types.ts
│   │       ├── fitness/
│   │       │   ├── fitness.context.tsx
│   │       │   └── fitness.types.ts
│   │       └── nutrition-tracker/
│   │           ├── nutrition-tracker.context.tsx
│   │           └── nutrition-tracker.types.ts
│   ├── custom.d.ts
│   ├── index.js
│   ├── index.scss
│   ├── logo.svg
│   ├── pages/
│   │   ├── shared/
│   │   │   ├── chatbot/
│   │   │   │   ├── chatbot.component.jsx
│   │   │   │   ├── chatbot.styles.jsx
│   │   │   │   └── chatbot.styles.scss
│   │   │   ├── home/
│   │   │   │   ├── home.component.jsx
│   │   │   │   ├── home.styles.jsx
│   │   │   │   └── home.styles.scss
│   │   │   ├── nutrient-predictor/
│   │   │   │   ├── nutrient-predictor.component.jsx
│   │   │   │   ├── nutrient-predictor.styles.jsx
│   │   │   │   └── nutrient-predictor.styles.scss
│   │   │   └── recipes/
│   │   │       ├── recipes.component.jsx
│   │   │       ├── recipes.styles.jsx
│   │   │       └── recipes.styles.scss
│   │   ├── signed-in/
│   │   │   ├── calories-burned/
│   │   │   │   ├── calories-burned.component.jsx
│   │   │   │   ├── calories-burned.styles.jsx
│   │   │   │   └── calories-burned.styles.scss
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.jsx
│   │   │   │   ├── dashboard.styles.jsx
│   │   │   │   └── dashboard.styles.scss
│   │   │   ├── fitness/
│   │   │   │   ├── fitness.component.jsx
│   │   │   │   ├── fitness.styles.jsx
│   │   │   │   └── fitness.styles.scss
│   │   │   └── nutrition-tracker/
│   │   │       ├── nutrition-tracker.component.jsx
│   │   │       ├── nutrition-tracker.styles.jsx
│   │   │       └── nutrition-tracker.styles.scss
│   │   └── signed-out/
│   │       ├── calories-burned/
│   │       │   ├── calories-burned.component.jsx
│   │       │   ├── calories-burned.styles.jsx
│   │       │   └── calories-burned.styles.scss
│   │       ├── dashboard/
│   │       │   ├── dashboard.component.jsx
│   │       │   ├── dashboard.styles.jsx
│   │       │   └── dashboard.styles.scss
│   │       ├── fitness/
│   │       │   ├── fitness.component.jsx
│   │       │   ├── fitness.styles.jsx
│   │       │   └── fitness.styles.scss
│   │       └── nutrition-tracker/
│   │           ├── nutrition-tracker.component.jsx
│   │           ├── nutrition-tracker.styles.jsx
│   │           └── nutrition-tracker.styles.scss
│   ├── reportWebVitals.js
│   ├── routes/
│   │   ├── shared/
│   │   │   ├── home/
│   │   │   │   ├── home.component.jsx
│   │   │   │   └── home.styles.scss
│   │   │   ├── navigation/
│   │   │   │   ├── navigation.component.jsx
│   │   │   │   ├── navigation.styles.jsx
│   │   │   │   └── navigation.styles.scss
│   │   │   ├── nutrient-predictor/
│   │   │   │   ├── nutrient-predictor.component.jsx
│   │   │   │   └── nutrient-predictor.styles.scss
│   │   │   └── recipes/
│   │   │       ├── recipes.component.jsx
│   │   │       └── recipes.styles.scss
│   │   ├── signed-in/
│   │   │   ├── calories-burned/
│   │   │   │   ├── calories-burned.component.jsx
│   │   │   │   └── calories-burned.styles.scss
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.jsx
│   │   │   │   └── dashboard.styles.scss
│   │   │   ├── fitness/
│   │   │   │   ├── fitness.component.jsx
│   │   │   │   └── fitness.styles.scss
│   │   │   └── nutrition-tracker/
│   │   │       ├── nutrition-tracker.component.jsx
│   │   │       └── nutrition-tracker.styles.scss
│   │   └── signed-out/
│   │       ├── authentication/
│   │       │   ├── authentication.component.jsx
│   │       │   └── authentication.styles.scss
│   │       ├── calories-burned/
│   │       │   ├── calories-burned.component.jsx
│   │       │   └── calories-burned.styles.scss
│   │       ├── dashboard/
│   │       │   ├── dashboard.component.jsx
│   │       │   └── dashboard.styles.scss
│   │       ├── fitness/
│   │       │   ├── fitness.component.jsx
│   │       │   └── fitness.styles.scss
│   │       └── nutrition-tracker/
│   │           ├── nutrition-tracker.component.jsx
│   │           └── nutrition-tracker.styles.scss
│   ├── setupTests.js
│   ├── store/
│   │   ├── middleware/
│   │   │   └── logger.ts
│   │   ├── root-reducer.toolkit.ts
│   │   ├── root-reducer.ts
│   │   ├── root-saga.ts
│   │   ├── shared/
│   │   │   ├── chatbot/
│   │   │   ├── nutrient-predictor/
│   │   │   ├── recipes/
│   │   │   └── user/
│   │   │       ├── user.action.ts
│   │   │       ├── user.reducer.toolkit.ts
│   │   │       ├── user.reducer.ts
│   │   │       ├── user.saga.ts
│   │   │       ├── user.selector.ts
│   │   │       └── user.types.ts
│   │   ├── signed-in/
│   │   │   ├── calories-burned/
│   │   │   └── nutrition-tracker/
│   │   ├── signed-out/
│   │   │   ├── calories-burned/
│   │   │   └── nutrition-tracker/
│   │   │       ├── nutrition-tracker.action.ts
│   │   │       ├── nutrition-tracker.reducer.toolkit.ts
│   │   │       ├── nutrition-tracker.reducer.ts
│   │   │       ├── nutrition-tracker.selector.ts
│   │   │       └── nutrition-tracker.types.ts
│   │   ├── store.toolkit.ts
│   │   └── store.ts
│   └── utils/
│       ├── api-requests/
│       │   ├── calories-burned.requests.js
│       │   ├── chatbot.requests.js
│       │   ├── fitness.requests.js
│       │   ├── nutrient-predictor.requests.js
│       │   ├── nutrition-tracker.requests.js
│       │   └── recipes.requests.js
│       ├── calculations/
│       │   ├── calories-burned.calculations.ts
│       │   ├── nutrition-tracker.calculations.js
│       │   └── recipes.calculations.js
│       ├── constants/
│       │   ├── calories-burned.constants.js
│       │   ├── chatbot.constants.js
│       │   ├── fitness.constants.js
│       │   ├── nutrient-predictor.constants.js
│       │   ├── nutrition-tracker.constants.js
│       │   ├── recipes.constants.js
│       │   └── shared.constants.js
│       ├── errors/
│       │   ├── calories-burned.errors.js
│       │   ├── chatbot.errors.js
│       │   ├── fitness.errors.js
│       │   ├── nutrient-predictor.errors.js
│       │   ├── nutrition-tracker.errors.js
│       │   ├── recipes.errors.js
│       │   └── user.errors.js
│       ├── external-js/
│       │   └── nutrition-predictor.external.js
│       ├── firebase/
│       │   └── firebase.utils.ts
│       ├── graphql/
│       │   ├── calories-burned.graphql.js
│       │   ├── fitness.graphql.js
│       │   └── nutrition-tracker.graphql.js
│       ├── reducer/
│       │   └── reducer.utils.ts
│       └── validations/
│           ├── calories-burned.validations.js
│           ├── chatbot.validation.js
│           ├── fitness.validations.js
│           ├── nutrient-predictor.validations.js
│           ├── nutrition-tracker.validations.js
│           ├── recipes.validations.js
│           └── regex.constants.js
└── tsconfig.json
```

<figure>
  <img width="836" alt="image" src="https://github.com/user-attachments/assets/553132be-cd92-4cdd-8d4e-6c2393317212">
</figure>
<br>

[Figure 1: High level view](https://whimsical.com/nutri-sight-8GkB9enG8Hwg6jfc8LF7pv)
<br>
<br>

### The application consists of the following main components:

1. __Client__: React frontend web application which sends requests to the __Nutrition Tracker__, __Food Predict__ and __Object Detect__ APIs. The frontend is developed using JavaScript with a TypeScript shift currently in place. State is managed by Redux and the React context API. UI is developed using Material UI, styled components, Tailwind and Bootstrap. It is also deployed with Docker. The client supports requests for the following:
* Chatbot responses
* Nutrient predictor
* Nutrition tracker
* Fitness
* Calories burned tracker
* Recipes
* Authentication
* Notifications
3. __Authentication__: Authentication is handled using Firebase Authentication and Functions.
4. __Nutrition Tracker API__: API developed using Express and GraphQL, which services majority of requests from the client, excluding computer vision and NLP predictions. The API requests MongoDB clusters, Redis, Cloud Firestore, AWS RDS databases. Additionally, it requests the [ml-job-scheduler]() to trigger a job to train the computer vision and NLP models. It also uses the OpenAI API, fatsecret and other external APIs.
5. __Food Predict API__: API developed using Express and GraphQL, which services requests from the nutrient predictor. It uses the trained NLP models to generate predictions on the foods mentioned in the description provided by the user.
6. __Object Detect API__: API developed using django and deployed to AWS EC2. API serves requests for food detection in the images provided by the user. It uses the trained computer vision models to generate predictions.
7. __Services__: The following services are used:
* OpenAI: Services chatbot requests
* fatsecret: Provides nutrition related data
* External APIs: Includes APIs for miscellaneous nutrition related data, exercises data, recipes, etc.
8. __Databases__: The following databases are used:
* MongoDB:
  - Nutrition tracker
  - Fitness
  - Calories burned tracker
* Redis:
  - Cached data
* Cloud Firestore:
  - Authentication
* AWS RDS:
  - ML training data
9. __Machine learning__: ML models for BTC and stock predictions developed using TensorFlow / PyTorch. [ml-job-scheduler](https://github.com/tahmid-saj/ml-job-scheduler) handles the automated job runs from preprocessing, training, predictions, postprocessing, etc. The logs of the job runs are stored in S3 and the data is stored in MongoDB.
10. __Data engineering__: Performs manual data migration using an external ETL / ELT API developed in Go, [etl-elt-api](https://github.com/tahmid-saj/etl-elt-api)
11. __Security__: AWS security services (AWS Inspector and GuardDuty) which monitors the security of APIs. Later, data and logs from the services are queried and viewed using an external security tool.
12. __Monitoring__: Monitoring service which collects data and logs from APIs using CloudWatch, then stores them in S3 to be viewed as a dashboard via an external monitoring tool. 
13. __Notifications__: Receives various data and logs in S3 buckets and later sends emails (on issues or failures) using SQS and Lambda.

### Setting up the development environment:

1. __Cloning the repository__: You would first need to clone this repository on the host you want to set up your development environment:
```shell
git clone https://github.com/tahmid-saj/nutri-sight.git
```
2. __Installing dependencies__: Install the required NPM packages in __package.json__:
```shell
npm install
```
3. __Environment variables__: The required environment variables are used:
```env
# firebase
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENTER_ID=""
REACT_APP_FIREBASE_APP_ID=""

# There are several other environment variables for the APIs and services used in the client 
```
4. __APIs__: Client requests go to two APIs:
* __Nutrition Tracker API__
* __Food Predict API__
* __Object Detect API__
5. __Services__: API keys are used from the following services in the __Nutrition Tracker API__:
* OpenAI: Services chatbot requests
* fatsecret: Provides nutrition related data
* External APIs: Includes APIs for miscellaneous nutrition related data, exercises data, recipes, etc.
6. __Databases__: A MongoDB cluster and collections are created, and a connection is established with the __Nutrition Tracker API__. A Redis cluster is also created for storing cached data. Additionally Cloud Firestore and AWS RDS are both initialized for storing authentication and ML model training data respectively.
7. __Data engineering__: The set up for the development environment for the data engineering tool can be found [here](https://github.com/tahmid-saj/etl-elt-api).
8. __Machine learning__: The set up for the development environment for the ML job scheduler can be found [here](https://github.com/tahmid-saj/ml-job-scheduler).
9. __AWS__: Setting up the AWS services is an optional step as this is on a development environment. However, the same services could be used to create the tools mentioned in the high level view.
10. __Running the client__: The client can be run using:
```
npm start
```
