import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './context/shared/user/user.context';
import { NutrientPredictorProvider } from './context/shared/nutrient-predictor/nutrient-predictor.context';
import { NutritionTrackerProvider as NutritionTrackerProviderSignedOut } from './context/signed-out/nutrition-tracker/nutrition-tracker.context';
import { RecipesProvider } from './context/shared/recipes/recipes.context';

import { NutritionTrackerProvider as NutritionTrackerProviderSignedIn } from './context/signed-in/nutrition-tracker/nutrition-tracker.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NutrientPredictorProvider>
        <NutritionTrackerProviderSignedOut>
          <RecipesProvider>
            <UserProvider>
              <NutritionTrackerProviderSignedIn>
                <App />
              </NutritionTrackerProviderSignedIn>
            </UserProvider>
          </RecipesProvider>
        </NutritionTrackerProviderSignedOut>
      </NutrientPredictorProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
