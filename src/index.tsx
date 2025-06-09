import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/shared/user/user.context';
import { ChatroomsProvider } from "./contexts/signed-out/chat-rooms/chat-rooms.context"
import { NearbyRunnersProvider } from "./contexts/signed-out/nearby-runners/nearby-runners.context"
import { NotificationsProvider } from "./contexts/signed-out/notifications/notifications.context"
import { ChatBotProvider } from './contexts/shared/chatbot/chatbot.context';
import { NutrientPredictorProvider } from './contexts/shared/nutrient-predictor/nutrient-predictor.context';
import { FitnessProvider } from './contexts/signed-out/fitness/fitness.context';
import { NutritionTrackerProvider } from './contexts/signed-out/nutrition-tracker/nutrition-tracker.context';
import { CaloriesBurnedProvider } from './contexts/signed-out/calories-burned/calories-burned.context';
import { RecipesProvider } from './contexts/shared/recipes/recipes.context';

import { ChatroomsProvider as ChatroomsProviderSignedIn } from "./contexts/signed-in/chat-rooms/chat-rooms.context"
import { NutritionTrackerProvider as NutritionTrackerProviderSignedIn } from './contexts/signed-in/nutrition-tracker/nutrition-tracker.context';
import { FitnessProvider as FitnessProviderSignedIn } from './contexts/signed-in/fitness/fitness.context';
import { CaloriesBurnedProvider as CaloriesBurnedProviderSignedIn } from './contexts/signed-in/calories-burned/calories-burned.context';
import { NotificationsProvider as NotificationsProviderSignedIn } from "./contexts/signed-in/notifications/notifications.context"

import { Provider } from "react-redux"
import { store } from "./store/store"
import { PersistGate } from "redux-persist/integration/react"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// const client = new ApolloClient({
//   uri: "http://localhost:8000/graphql",
//   cache: new InMemoryCache()
// })

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={ client }> */}
        <Provider store={ store }>
          {/* <PersistGate loading={ null } persistor={ persistor }> */}
            <BrowserRouter>
              <ChatroomsProvider>
                <ChatroomsProviderSignedIn>
                  <NearbyRunnersProvider>
                    <NotificationsProvider>
                      <ChatBotProvider>
                        <NutrientPredictorProvider>
                          <FitnessProvider>
                            {/* <NutritionTrackerProviderSignedOut> */}
                              <CaloriesBurnedProvider>
                                <RecipesProvider>
                                  {/* <UserProvider> */}
                                    <NutritionTrackerProviderSignedIn>
                                      <FitnessProviderSignedIn>
                                        <CaloriesBurnedProviderSignedIn>
                                          <NotificationsProviderSignedIn>
                                            <App />
                                          </NotificationsProviderSignedIn>
                                        </CaloriesBurnedProviderSignedIn>
                                      </FitnessProviderSignedIn>
                                    </NutritionTrackerProviderSignedIn>
                                  {/* </UserProvider> */}
                                </RecipesProvider>
                              </CaloriesBurnedProvider>
                            {/* </NutritionTrackerProviderSignedOut> */}
                          </FitnessProvider>
                        </NutrientPredictorProvider>
                      </ChatBotProvider>
                    </NotificationsProvider>
                  </NearbyRunnersProvider>
                </ChatroomsProviderSignedIn>
              </ChatroomsProvider>
            </BrowserRouter>
          {/* </PersistGate> */}
        </Provider>
    {/* </ApolloProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
