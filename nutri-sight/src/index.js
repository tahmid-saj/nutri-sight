import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/shared/user/user.context';
import { NutrientPredictorProvider } from './contexts/shared/nutrient-predictor/nutrient-predictor.context';
import { NutritionTrackerProvider as NutritionTrackerProviderSignedOut } from './contexts/signed-out/nutrition-tracker/nutrition-tracker.context';
import { CaloriesBurnedProvider as CaloriesBurnedProviderSignedOut } from './contexts/signed-out/calories-burned/calories-burned.context';
import { RecipesProvider } from './contexts/shared/recipes/recipes.context';


import { NutritionTrackerProvider as NutritionTrackerProviderSignedIn } from './contexts/signed-in/nutrition-tracker/nutrition-tracker.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NutrientPredictorProvider>
        <NutritionTrackerProviderSignedOut>
          <CaloriesBurnedProviderSignedOut>
            <RecipesProvider>
              <UserProvider>
                <NutritionTrackerProviderSignedIn>
                  <App />
                </NutritionTrackerProviderSignedIn>
              </UserProvider>
            </RecipesProvider>
          </CaloriesBurnedProviderSignedOut>
        </NutritionTrackerProviderSignedOut>
      </NutrientPredictorProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
