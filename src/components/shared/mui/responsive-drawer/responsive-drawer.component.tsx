// import "./responsive-drawer.styles.scss";
// import { useContext } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import HomeIcon from "@mui/icons-material/Home";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import FoodBankIcon from "@mui/icons-material/FoodBank";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ArticleIcon from "@mui/icons-material/Article";
// import LanguageIcon from "@mui/icons-material/Language";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
// import { CaloriesBurnedContext } from "../../../../contexts/signed-in/calories-burned/calories-burned.context";
// import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context";
// import { ResponsiveStylingContext } from "../../../../contexts/shared/responsive-styling/responsive-styling.context";

// import { COLOR_CODES, COMMON_SPACING, NAV_LINKS } from "../../../../utils/constants/shared.constants";
// import { selectCurrentUser } from "../../../../store/shared/user/user.selector";
// import { signOutStart } from "../../../../store/shared/user/user.action";

// const drawerWidth = COMMON_SPACING.navBarWidth;

// interface Props {
//   window?: () => Window;
// }

// const ResponsiveDrawer: React.FC<Props> = ({ window }) => {
//   const { mobileOpen, isClosing, setMobileOpen, setIsClosing } = useContext(ResponsiveStylingContext);
//   const currentUser = useSelector(selectCurrentUser);
//   const { updateNutritionTrackedDaysAndSummary } = useContext(NutritionTrackerContext);
//   const { updateTrackedCaloriesBurned } = useContext(CaloriesBurnedContext);
//   const { updateExercises } = useContext(FitnessContext);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const navLinksHeaders = currentUser ? NAV_LINKS.signedIn : NAV_LINKS.signedOut;

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleSignOut = () => {
//     updateNutritionTrackedDaysAndSummary();
//     updateTrackedCaloriesBurned();
//     updateExercises();
//     dispatch(signOutStart());
//     navigate("/");
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {navLinksHeaders.section1.map(({ header, path }) => (
//           <Link to={`${path}`} key={header}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {header === NAV_LINKS.headers.home && <HomeIcon />}
//                   {header === NAV_LINKS.headers.chatbot && <SmartToyIcon />}
//                   {header === NAV_LINKS.headers.dashboard && <DashboardIcon />}
//                   {header === NAV_LINKS.headers.nutrientPredictor && <CameraAltIcon />}
//                   {header === NAV_LINKS.headers.nutritionTracker && <RestaurantIcon />}
//                   {header === NAV_LINKS.headers.fitness && <FitnessCenterIcon />}
//                   {header === NAV_LINKS.headers.caloriesBurned && <DirectionsRunIcon />}
//                   {header === NAV_LINKS.headers.recipes && <FoodBankIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={header} />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         ))}
//       </List>

//       <Divider />

//       <List>
//         {navLinksHeaders.section2.map(({ header, path }) => {
//           return currentUser ? (
//             <span onClick={handleSignOut} key={header}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     {header === NAV_LINKS.headers.signedIn && <LogoutIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={header} />
//                 </ListItemButton>
//               </ListItem>
//             </span>
//           ) : (
//             <Link to={`${path}`} key={header}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     {header === NAV_LINKS.headers.signedOut && <LoginIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={header} />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           );
//         })}
//       </List>

//       <Divider />

//       <List>
//         {navLinksHeaders.section3.map(({ header, url }) => (
//           <Link to={`${url}`} key={header}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {header === NAV_LINKS.headers.website && <LanguageIcon />}
//                   {header === NAV_LINKS.headers.github && <GitHubIcon />}
//                   {header === NAV_LINKS.headers.medium && <ArticleIcon />}
//                   {header === NAV_LINKS.headers.linkedin && <LinkedInIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={header} />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar sx={{ backgroundColor: COLOR_CODES.general["4"], width: "100%" }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <div className="nutrition-tracker-title">
//             <Typography variant="h6" noWrap component="div">
//               Nutrition Tracker
//             </Typography>
//             {currentUser && (
//               <Typography variant="body2" noWrap component="div">
//                 {`Hello ${currentUser.displayName}`}
//               </Typography>
//             )}
//           </div>
//         </Toolbar>
//       </AppBar>

//       <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// };

// export default ResponsiveDrawer;
