import "./hidden-drawer.styles.scss"
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DashboardIcon from '@mui/icons-material/Dashboard'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Link, useNavigate } from 'react-router-dom';
import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import { CaloriesBurnedContext } from "../../../../contexts/signed-in/calories-burned/calories-burned.context";
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context";
// import { signOutUser } from '../../../../utils/firebase/firebase.utils';

import { COLOR_CODES, COMMON_SPACING, NAV_LINKS } from '../../../../utils/constants/shared.constants';

import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../../../store/shared/user/user.selector";
import { signOutStart } from "../../../../store/shared/user/user.action";

export default function HiddenDrawer() {
  const [open, setOpen] = useState(true);

  const currentUser = useSelector(selectCurrentUser)
  const { updateNutritionTrackedDaysAndSummary } = useContext(NutritionTrackerContext);
  const { updateTrackedCaloriesBurned } = useContext(CaloriesBurnedContext)
  const { updateExercises } = useContext(FitnessContext)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignOut = () => {
    updateNutritionTrackedDaysAndSummary();
    updateTrackedCaloriesBurned()
    updateExercises()
    // signOutUser();
    dispatch(signOutStart())
    navigate("/")
  }

  let navLinksHeaders;
  if (currentUser) {
    navLinksHeaders = NAV_LINKS.signedIn
  } else {
    navLinksHeaders = NAV_LINKS.signedOut
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        { navLinksHeaders.section1.map(({ header, path }, index) => (
          <Link to={ `${path}` }>
            <ListItem key={ header } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    { header === NAV_LINKS.headers.home ? <HomeIcon/> : null }
                    { header === NAV_LINKS.headers.chatbot ? <SmartToyIcon/> : null }
                    { header === NAV_LINKS.headers.dashboard ? <DashboardIcon/> : null }
                    { header === NAV_LINKS.headers.nutrientPredictor ? <CameraAltIcon/> : null }
                    { header === NAV_LINKS.headers.nutritionTracker ? <RestaurantIcon/> : null }
                    { header === NAV_LINKS.headers.fitness ? <FitnessCenterIcon/> : null }
                    { header === NAV_LINKS.headers.caloriesBurned ? <DirectionsRunIcon/> : null }
                    { header === NAV_LINKS.headers.recipes ? <FoodBankIcon/> : null }
                </ListItemIcon>
                <ListItemText primary={ header } />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        { navLinksHeaders.section2.map(({ header, path }, index) => {
          return (
              currentUser ? (
                <span onClick={ handleSignOut }>
                  <ListItem key={header} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        { header === NAV_LINKS.headers.signedIn ? <LogoutIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header}/>
                    </ListItemButton>
                  </ListItem>
                </span>
              ) : (
                <Link to={ `${path}` }>
                  <ListItem key={header} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        { header === NAV_LINKS.headers.signedOut ? <LoginIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header}/>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            )
        })}
      </List>

      <Divider/>

      <List>
        { navLinksHeaders.section3.map(({ header, url }, index) => (
          <Link to={ `${url}` }>
            <ListItem key={ header } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  { header === NAV_LINKS.headers.website ? <LanguageIcon/> : null }
                  { header === NAV_LINKS.headers.github ? <GitHubIcon/> : null }
                  { header === NAV_LINKS.headers.medium ? <ion-icon name="logo-medium"></ion-icon> : null }
                  { header === NAV_LINKS.headers.linkedin ? <LinkedInIcon/> : null }
                </ListItemIcon>
                <ListItemText primary={ header } />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <div className='nutrition-tracker-title'>
          <MenuIcon/>
          <Typography sx={{ marginLeft: "10px", color: COLOR_CODES.general["0"] }} variant="h6">
            Nutrition Tracker
          </Typography>
          {
            currentUser ?
            <Typography sx={{ color: COLOR_CODES.general["5"] }} variant="body2">
              { `Hello ${currentUser.displayName}` }
            </Typography> : null
          }
        </div>
      </Button>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
