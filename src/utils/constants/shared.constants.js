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
    fitness: "Fitness",
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
      fitness: "/fitness",
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
      fitness: "/fitness-signed-in",
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
        header: "Fitness",
        path: "/fitness",
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
        header: "Fitness",
        path: "/fitness-signed-in",
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
  },
  scrollbar: {
    scroll: "#666666",
    background: "white"
  },
  general: {
    "0": "#74c6be",
    "1": "#38a59d",
    "2": "#2c837d",
    "3": "#05837c",
    "4": "#166c6b",
    "5": "#c6efeb",
    "6": "#3ca99f",
    "7": "#237e76",
    "8": "#115852",
    "9": "#0a3632",
  },
  background: "#a8afb8"
}

export const TAB_HEADERS = {

}

export const COMMON_SPACING = {
  screenWidthOnDrawerClose: 500,
  navBarWidth: 225,
  navBarMargin: 230,
  hiddenAppBarMarginTop: 60,
  pageContent: {
    margin: {
      top: "0%",
      right: "2%",
      bottom: "2%",
      left: "2%"
    }
  },
  calendarDayInfo: {
    width: 375,
    height: 600
  },
  summaryInfoCard: {
    width: 375
  },
  filter: {
    width: 375
  },
  pieChart: {
    width: 375,
    height: 375
  },
  barChart: {
    width: "100%",
    height: 400
  },
  lineChart: {
    width: "100%",
    height: 400
  },
  table: {
    width: "100%"
  },
  filterTable: {
    height: 650
  },
  exercisesInfoCard: {
    width: 325
  }
}