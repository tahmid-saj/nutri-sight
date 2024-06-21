import "./home.styles.jsx";
import { HomeContainer } from "./home.styles.jsx";
import MediaCard from "../../../components/shared/mui/media-card/media-card.component.jsx"
import { Fragment } from "react";

import { useContext } from "react";
// import { UserContext } from "../../../contexts/shared/user/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector.js";

import { COLOR_CODES, NAV_LINKS } from "../../../utils/constants/shared.constants.js";

const styles = {
  width: 350,
  height: 450,
  backgroundColor: COLOR_CODES.general["0"],
  marginBottom: "6%"
}

const Home = () => {
  // const { currentUser } = useContext(UserContext)
  const currentUser = useSelector(selectCurrentUser)
  
  const homeCardContent = {
    chatbot: {
      header: "Chatbot",
      description: "Receive advice on maintaining a healthy diet, nutrition, exercise and much more",
      imageUrl: "https://media.licdn.com/dms/image/D4D12AQESxyAG3GNCQQ/article-cover_image-shrink_720_1280/0/1688674501094?e=2147483647&v=beta&t=TbnHoFrlrAZCHk6Qfm6lfBD9qNSgJ0IyOFdKa32mBWE",
      path: currentUser ? NAV_LINKS.paths.signedIn.chatbot : NAV_LINKS.paths.signedOut.chatbot
    },
    storage: {
      header: "Storage",
      description: "Upon signing up and logging into your account, we will store your data and provide specific advices for you",
      imageUrl: "https://media.istockphoto.com/id/1470864494/vector/computer-cloud-database-sharing-file-storage-and-search-business-technology-services-and.jpg?b=1&s=612x612&w=0&k=20&c=F4P8bKXbSsoZpCF4JahdPLz4OV7imHxMvgfDew4y9J8=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.auth
    },
    nutrientPredictor: {
      header: "Nutrient Predictor",
      description: "Get a prediction on the nutrients of your daily meals by either providing a description or an image of the food",
      imageUrl: "https://samsungfood.com/wp-content/uploads/2023/08/analyize_nutrition-1024x923.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.nutrientPredictor : NAV_LINKS.paths.signedOut.nutrientPredictor
    },
    nutritionTracker: {
      header: "Nutrition Tracker",
      description: "Track your everyday consumption and better manage a healthy diet",
      imageUrl: "https://www.fdli.org/wp-content/uploads/2021/09/Food-Labeling-Greenthal-scaled.jpeg",
      path: currentUser ? NAV_LINKS.paths.signedIn.nutritionTracker : NAV_LINKS.paths.signedOut.nutritionTracker
    },
    fitness: {
      header: "Fitness",
      description: "Search thousands of exercises and their instructions, then add them to a schedule",
      imageUrl: "https://www.comparethemarket.com.au/wp-content/uploads/2023/02/Most-Dangerous-Gym-Equipment-Featured-Image.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.fitness : NAV_LINKS.paths.signedOut.fitness
    },
    caloriesBurned: {
      header: "Calories Burned",
      description: "Determine the calories burned through your exercises and activities, and add them to the tracker",
      imageUrl: "https://img.freepik.com/free-vector/people-running-activity_24908-55933.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.caloriesBurned : NAV_LINKS.paths.signedOut.caloriesBurned
    },
    recipes: {
      header: "Recipes",
      description: "Search over 1,000,000 recipes and get their nutrition information and detailed instructions on making them",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/led-tyson-recipe-1549405466.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
      path: currentUser ? NAV_LINKS.paths.signedIn.recipes : NAV_LINKS.paths.signedOut.recipes
    },
    notifications: {
      header: "Notifications",
      description: "Upon signing up and tracking nutrition and fitness, receive notifications of any planned activities on your calendar",
      imageUrl: "https://media.istockphoto.com/id/1395865981/vector/3d-reminder-in-calendar-on-purple-background-notifications-page-with-floating-elements-alert.jpg?s=612x612&w=0&k=20&c=JTK6NaSe9bYp9Pq2sfBoDYYCOhGEZlQNcQQJgy25FWI=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.auth
    },
    summary: {
      header: "All in one place",
      description: "Manage day to day activities on nutrition, wellness and fitness all in one place",
      imageUrl: "https://media.istockphoto.com/id/1345079251/vector/flat-vector-illustration-of-stock-trader-working-on-computer.jpg?s=612x612&w=0&k=20&c=GMvrs8GIsUf-zOua-9b3vHrgRPWxhUrddEULrytSTNE=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.dashboard
    },
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.chatbot.header } imageUrl={ homeCardContent.chatbot.imageUrl } 
            imageTitle={ homeCardContent.chatbot.header } path={ homeCardContent.chatbot.path } content={ homeCardContent.chatbot.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.storage.header } imageUrl={ homeCardContent.storage.imageUrl } 
            imageTitle={ homeCardContent.storage.header } path={ homeCardContent.storage.path } content={ homeCardContent.storage.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.nutrientPredictor.header } imageUrl={ homeCardContent.nutrientPredictor.imageUrl } 
            imageTitle={ homeCardContent.nutrientPredictor.header } path={ homeCardContent.nutrientPredictor.path } content={ homeCardContent.nutrientPredictor.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.nutritionTracker.header } imageUrl={ homeCardContent.nutritionTracker.imageUrl } 
            imageTitle={ homeCardContent.nutritionTracker.header } path={ homeCardContent.nutritionTracker.path } content={ homeCardContent.nutritionTracker.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.fitness.header } imageUrl={ homeCardContent.fitness.imageUrl } 
            imageTitle={ homeCardContent.fitness.header } path={ homeCardContent.fitness.path } content={ homeCardContent.fitness.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.caloriesBurned.header } imageUrl={ homeCardContent.caloriesBurned.imageUrl } 
            imageTitle={ homeCardContent.caloriesBurned.header } path={ homeCardContent.caloriesBurned.path } content={ homeCardContent.caloriesBurned.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.recipes.header } imageUrl={ homeCardContent.recipes.imageUrl } 
            imageTitle={ homeCardContent.recipes.header } path={ homeCardContent.recipes.path } content={ homeCardContent.recipes.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.notifications.header } imageUrl={ homeCardContent.notifications.imageUrl } 
            imageTitle={ homeCardContent.notifications.header } path={ homeCardContent.notifications.path } content={ homeCardContent.notifications.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ styles } header={ homeCardContent.summary.header } imageUrl={ homeCardContent.summary.imageUrl } 
            imageTitle={ homeCardContent.summary.header } path={ homeCardContent.summary.path } content={ homeCardContent.summary.description }></MediaCard>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;