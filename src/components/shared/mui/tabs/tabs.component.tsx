// disabled / centered / scrollable / icon / color tabs
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface TabItem {
  value: string;
  label: string;
  icon?: JSX.Element;
}

interface PanelItem {
  value: string;
  children: React.ReactNode;
}

interface ItemTabsProps {
  outerBoxStyles?: object;
  innerBoxStyles?: object;
  tabList: TabItem[];
  panelList: PanelItem[];
}

export default function ItemTabs({ outerBoxStyles, innerBoxStyles, tabList, panelList }: ItemTabsProps) {
  const [value, setValue] = useState<string>(tabList.length > 0 ? tabList[0].value : '');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", ...outerBoxStyles }}>
      <TabContext value={ value }>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', 
          display: "flex", justifyContent: "center", alignItems: "center", ...innerBoxStyles }}>
          <Tabs value={ value } onChange={ handleChange }
          textColor="primary" indicatorColor="primary" variant="scrollable" aria-label="item tabs">
            {
              tabList.map((tab) => {
                return (
                  <Tab key={ tab.value } icon={ tab.icon } label={ tab.label } value={ tab.value }/>
                )
              })
            }
          </Tabs>
        </Box>

        {
          panelList.map((panel) => {
            return (
              <TabPanel key={panel.value} value={ panel.value }>
                { panel.children }
              </TabPanel>
            )
          })
        }
      </TabContext>
    </Box>

    // {/* <Box sx={{ width: '100%', typography: 'body1' }}>
    //   <TabContext value={value}>
    //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //       <TabList onChange={handleChange} aria-label="lab API tabs example">
    //         <Tab label="Item One" value="1" />
    //         <Tab label="Item Two" value="2" />
    //         <Tab label="Item Three" value="3" />
    //       </TabList>
    //     </Box>
    //     <TabPanel value="1">Item One</TabPanel>
    //     <TabPanel value="2">Item Two</TabPanel>
    //     <TabPanel value="3">Item Three</TabPanel>
    //   </TabContext>
    // </Box> */}
  );
}

function ItemTabsExample() {
  const [value, setValue] = useState<string>("active2");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={ handleChange } variant="scrollable" scrollButtons="auto"
        textColor="secondary" indicatorColor="secondary" aria-label="disabled tabs example">
        <Tab icon={ <HomeIcon/> } label="Active1" value="active1"/>
        <Tab label="Disabled" disabled value="disabled"/>
        <Tab label="Active2" value="active2"/>
      </Tabs>
    </Box>
  );
}
