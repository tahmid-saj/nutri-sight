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

1. __Client__:
2. __Authentication__:
3. __Nutrition Tracker API__:
4. __Food Predict API__:
5. __Object Detect API__:
6. __Services__:
7. __Databases__:
8. __Machine learning__:
9. __Data engineering__: Performs manual data migration using an external ETL / ELT API developed in Go, [etl-elt-api](https://github.com/tahmid-saj/etl-elt-api)
10. __Security__: AWS security services (AWS Inspector and GuardDuty) which monitors the security of APIs. Later, data and logs from the services are queried and viewed using an external security tool.
11. __Monitoring__: Monitoring service which collects data and logs from APIs using CloudWatch, then stores them in S3 to be viewed as a dashboard via an external monitoring tool. 
12. __Notifications__: Receives various data and logs in S3 buckets and later sends emails (on issues or failures) using SQS and Lambda.

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
5. __Services__:
6. __Databases__:
7. __Data engineering__: The set up for the development environment for the data engineering tool can be found [here](https://github.com/tahmid-saj/etl-elt-api).
8. __Machine learning__: The set up for the development environment for the ML job scheduler can be found [here](https://github.com/tahmid-saj/ml-job-scheduler).
9. __AWS__: Setting up the AWS services is an optional step as this is on a development environment. However, the same services could be used to create the tools mentioned in the high level view.
10. __Running the client__: The client can be run using:
```
npm start
```
