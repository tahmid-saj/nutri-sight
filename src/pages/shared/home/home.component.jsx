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
  width: 475,
  height: 400,
  backgroundColor: COLOR_CODES.general["0"]
}

const Home = () => {
  // const { currentUser } = useContext(UserContext)
  const currentUser = useSelector(selectCurrentUser)
  
  const homeCardContent = {
    chatbot: {
      header: "Chatbot",
      description: "Receive advice on maintaining a healthy diet, nutrition, exercise and much more",
      imageUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/334804806/original/793cad2ae511c4c9b30c1d5e8206b8eb8ab21087/create-a-ai-chat-bot-embedded-website-for-you.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.chatbot : NAV_LINKS.paths.signedOut.chatbot
    },
    storage: {
      header: "Storage",
      description: "Upon signing up and logging into your account, we will store your data and provide specific advices for you",
      imageUrl: "https://media.istockphoto.com/id/1352564117/vector/database-sql-structured-query-language-people-team-discuss-coding-for-storing-data-in-server.jpg?s=612x612&w=0&k=20&c=eRlvikJYlY8tJ8pVxgZFUv5GLgQbTy_rq18jKLZxq8A=",
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
      imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/013/416/799/small_2x/woman-choose-between-healthy-and-unhealthy-food-free-vector.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.nutritionTracker : NAV_LINKS.paths.signedOut.nutritionTracker
    },
    fitness: {
      header: "Fitness",
      description: "Search thousands of exercises and their instructions, then add them to a schedule",
      imageUrl: "https://media.istockphoto.com/id/1222178625/vector/stay-home-concept-people-doing-exercise-in-cozy-modern-interior-vector-illustration-in-flat.jpg?s=612x612&w=0&k=20&c=urkPKOi8j2wcHxaoDBummTwezO38qA3BSvqHqc6Mzb8=",
      path: currentUser ? NAV_LINKS.paths.signedIn.fitness : NAV_LINKS.paths.signedOut.fitness
    },
    caloriesBurned: {
      header: "Calories Burned",
      description: "Determine the calories burned through your exercises and activities, and add them to the tracker",
      imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/006/461/712/small/set-of-man-doing-exercise-gym-bike-jump-rope-and-treadmill-illustration-vector.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.caloriesBurned : NAV_LINKS.paths.signedOut.caloriesBurned
    },
    recipes: {
      header: "Recipes",
      description: "Search over 1,000,000 recipes and get their nutrition information and detailed instructions on making them",
      imageUrl: "https://png.pngtree.com/png-vector/20220712/ourmid/pngtree-flat-style-vector-illustration-of-a-creative-cooking-cookbook-featuring-healthy-recipes-vector-png-image_47565766.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.recipes : NAV_LINKS.paths.signedOut.recipes
    },
    notifications: {
      header: "Notifications",
      description: "Upon signing up and tracking nutrition and fitness, receive notifications of any planned activities on your calendar",
      imageUrl: "https://media.istockphoto.com/id/1336859622/vector/calendar-with-to-do-checklist-business-task-planning.jpg?s=612x612&w=0&k=20&c=rgIc9ejSfwmsEauhssGSaW5ZM6XjyB6-sBQQLU5qUA4=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.auth
    },
    summary: {
      header: "All in one place",
      description: "Manage day to day activities on nutrition, wellness and fitness all in one place",
      imageUrl: "https://webstockreview.net/images/nutrition-clipart-physical-wellness-1.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.dashboard
    },
  }

  return (
    <Fragment>
      <HomeContainer>
        <MediaCard styles={ styles } header={ homeCardContent.chatbot.header } imageUrl={ homeCardContent.chatbot.imageUrl } 
          imageTitle={ homeCardContent.chatbot.header } path={ homeCardContent.chatbot.path } content={ homeCardContent.chatbot.description }></MediaCard>

        <MediaCard styles={ styles } header={ homeCardContent.storage.header } imageUrl={ homeCardContent.storage.imageUrl } 
          imageTitle={ homeCardContent.storage.header } path={ homeCardContent.storage.path } content={ homeCardContent.storage.description }></MediaCard>
        
        <MediaCard styles={ styles } header={ homeCardContent.nutrientPredictor.header } imageUrl={ homeCardContent.nutrientPredictor.imageUrl } 
          imageTitle={ homeCardContent.nutrientPredictor.header } path={ homeCardContent.nutrientPredictor.path } content={ homeCardContent.nutrientPredictor.description }></MediaCard>
      </HomeContainer>

      <HomeContainer>
        <MediaCard styles={ styles } header={ homeCardContent.nutritionTracker.header } imageUrl={ homeCardContent.nutritionTracker.imageUrl } 
          imageTitle={ homeCardContent.nutritionTracker.header } path={ homeCardContent.nutritionTracker.path } content={ homeCardContent.nutritionTracker.description }></MediaCard>

        <MediaCard styles={ styles } header={ homeCardContent.fitness.header } imageUrl={ homeCardContent.fitness.imageUrl } 
          imageTitle={ homeCardContent.fitness.header } path={ homeCardContent.fitness.path } content={ homeCardContent.fitness.description }></MediaCard>

        <MediaCard styles={ styles } header={ homeCardContent.caloriesBurned.header } imageUrl={ homeCardContent.caloriesBurned.imageUrl } 
          imageTitle={ homeCardContent.caloriesBurned.header } path={ homeCardContent.caloriesBurned.path } content={ homeCardContent.caloriesBurned.description }></MediaCard>
      </HomeContainer>

      <HomeContainer>
        <MediaCard styles={ styles } header={ homeCardContent.recipes.header } imageUrl={ homeCardContent.recipes.imageUrl } 
          imageTitle={ homeCardContent.recipes.header } path={ homeCardContent.recipes.path } content={ homeCardContent.recipes.description }></MediaCard>

        <MediaCard styles={ styles } header={ homeCardContent.notifications.header } imageUrl={ homeCardContent.notifications.imageUrl } 
          imageTitle={ homeCardContent.notifications.header } path={ homeCardContent.notifications.path } content={ homeCardContent.notifications.description }></MediaCard>

        <MediaCard styles={ styles } header={ homeCardContent.summary.header } imageUrl={ homeCardContent.summary.imageUrl } 
          imageTitle={ homeCardContent.summary.header } path={ homeCardContent.summary.path } content={ homeCardContent.summary.description }></MediaCard>
      </HomeContainer>
    </Fragment>
  );
};

export default Home;