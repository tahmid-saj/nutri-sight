# [nutritiontracker.io](https://www.nutritiontracker.io/)
<br>

Nutrition tracker developed to provide predicted nutrition info via image / food description, keep track of meal consumption and burned calories. Also provides numerous recipes and their nutrition info. Developed using MERN, Firebase, Django, GraphQL, Redis, Postgresql, and ML based APIs.
<br>
<br>

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
