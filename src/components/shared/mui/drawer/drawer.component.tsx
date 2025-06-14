import "./drawer.styles.scss";
import { useContext, useState } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DashboardIcon from '@mui/icons-material/Dashboard';
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

import { COLOR_CODES, NAV_LINKS } from '../../../../utils/constants/shared.constants';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/shared/user/user.selector";
import { signOutStart } from "../../../../store/shared/user/user.action";

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

interface NavLinkItem {
  header: string;
  path?: string;
  url?: string;
}

interface NavLinksHeaders {
  section1: NavLinkItem[];
  section2: NavLinkItem[];
  section3: NavLinkItem[];
}

interface MiniDrawerProps {
  navLinksHeaders: NavLinksHeaders;
  children?: React.ReactNode;
}

export default function MiniDrawer({ navLinksHeaders, children }: MiniDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const { updateNutritionTrackedDaysAndSummary } = useContext(NutritionTrackerContext);
  const { updateTrackedCaloriesBurned } = useContext(CaloriesBurnedContext);
  const { updateExercises } = useContext(FitnessContext);

  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleSignOut = () => {
    updateNutritionTrackedDaysAndSummary();
    updateTrackedCaloriesBurned();
    updateExercises();
    dispatch(signOutStart());
    navigate("/");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ background: COLOR_CODES.general["4"], width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <div className="nutri-sight-title">
            <Typography variant="h6" noWrap component="div">Nutrition Tracker</Typography>
            {currentUser && (
              <Typography variant="body2" noWrap component="div">
                {`Hello ${currentUser.displayName}`}
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {navLinksHeaders.section1.map(({ header, path }) => (
            <Link key={header} to={path || '#'}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    {header === NAV_LINKS.headers.home && <HomeIcon />}
                    {header === NAV_LINKS.headers.chatbot && <SmartToyIcon />}
                    {header === NAV_LINKS.headers.dashboard && <DashboardIcon />}
                    {header === NAV_LINKS.headers.nutrientPredictor && <CameraAltIcon />}
                    {header === NAV_LINKS.headers.nutritionTracker && <RestaurantIcon />}
                    {header === NAV_LINKS.headers.fitness && <FitnessCenterIcon />}
                    {header === NAV_LINKS.headers.caloriesBurned && <DirectionsRunIcon />}
                    {header === NAV_LINKS.headers.recipes && <FoodBankIcon />}
                  </ListItemIcon>
                  <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />

        <List>
          {navLinksHeaders.section2.map(({ header, path }) =>
            currentUser ? (
              <span key={header} onClick={handleSignOut}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                      {header === NAV_LINKS.headers.signedIn && <LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </span>
            ) : (
              <Link key={header} to={path || '#'}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                      {header === NAV_LINKS.headers.signedOut && <LoginIcon />}
                    </ListItemIcon>
                    <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
        </List>

        <Divider />

        <List>
          {navLinksHeaders.section3.map(({ header, url }) => (
            <Link key={header} to={url || '#'}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    {header === NAV_LINKS.headers.website && <LanguageIcon />}
                    {header === NAV_LINKS.headers.github && <GitHubIcon />}
                    {header === NAV_LINKS.headers.linkedin && <LinkedInIcon />}
                    {header === NAV_LINKS.headers.medium && <></>} {/* Replace with actual Medium icon if using */}
                  </ListItemIcon>
                  <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
