// shared constants

export const BUTTON_TYPE_CLASSES = {
  base: "regular-button",
  google: "google-sign-in",
  inverted: "inverted",
};

export const NAV_LINKS = {
  headers: {
    home: "Home",
    chatbot: "Chatbot",
    dashboard: "Dashboard",
    nutrientPredictor: "Nutrient Predictor",
    nutritionTracker: "Nutrition Tracker",
    caloriesBurned: "Calories Burned",
    recipes: "Recipes",
    signedOut: "Sign In / Register",
    signedIn: "Sign Out",
    website: "tahmidsajin.com",
    github: "GitHub",
    medium: "Medium",
    linkedin: "LinkedIn"
  },
  paths: {
    signedOut: {
      home: "/",
      chatbot: "/dashboard",
      dashboard: "/dashboard",
      nutrientPredictor: "/nutrient-predictor",
      nutritionTracker: "/nutrition-tracker",
      caloriesBurned: "/calories-burned",
      recipes: "/recipes",
      auth: "/auth",
    },
    signedIn: {
      home: "/",
      chatbot: "/dashboard-signed-in",
      dashboard: "/dashboard-signed-in",
      nutrientPredictor: "/nutrient-predictor",
      nutritionTracker: "/nutrition-tracker-signed-in",
      caloriesBurned: "/calories-burned-signed-in",
      recipes: "/recipes",
      auth: "/",
    }
  },
  signedOut: {
    section1: [
      {
        header: "Home",
        path: "/",
      },
      {
        header: "Chatbot",
        path: "/dashboard",
      },
      {
        header: "Dashboard",
        path: "/dashboard",
      },
      {
        header: "Nutrient Predictor",
        path: "/nutrient-predictor",
      },
      {
        header: "Nutrition Tracker",
        path: "/nutrition-tracker",
      },
      {
        header: "Calories Burned",
        path: "/calories-burned",
      },
      {
        header: "Recipes",
        path: "/recipes",
      },
    ],
    section2: [
      {
        header: "Sign In / Register",
        path: "/auth"
      }
    ],
    section3: [
      {
        header: "tahmidsajin.com",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "LinkedIn",
        url: "https://ca.linkedin.com/in/tsajin"
      },
    ]
  },
  signedIn: {
    section1: [
      {
        header: "Home",
        path: "/",
      },
      {
        header: "Chatbot",
        path: "/dashboard-signed-in",
      },
      {
        header: "Dashboard",
        path: "/dashboard-signed-in",
      },
      {
        header: "Nutrient Predictor",
        path: "/nutrient-predictor",
      },
      {
        header: "Nutrition Tracker",
        path: "/nutrition-tracker-signed-in",
      },
      {
        header: "Calories Burned",
        path: "/calories-burned-signed-in",
      },
      {
        header: "Recipes",
        path: "/recipes",
      },
    ],
    section2: [
      {
        header: "Sign Out",
        path: "/"
      }
    ],
    section3: [
      {
        header: "tahmidsajin.com",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "LinkedIn",
        url: "https://ca.linkedin.com/in/tsajin"
      },
    ]
  }
}

export const COLOR_CODES = {
  card: {
    infoCard: "#F7F9F9"
  },
  paper: {
    formPaper: "#EAFAF1",
    infoPaper: "#F7F9F9"
  }
}