import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export interface TabItem {
  value: string;
  label: string;
  icon?: JSX.Element;
}

export interface PanelItem {
  value: string;
  children: React.ReactNode;
}

interface ItemTabsProps {
  outerBoxStyles?: object;
  innerBoxStyles?: object;
  tabList: TabItem[];
  panelList: PanelItem[];
}

const ItemTabs = ({ outerBoxStyles, innerBoxStyles, tabList, panelList }: ItemTabsProps) => {
  const [value, setValue] = useState<string>(tabList[0]?.value || "");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", ...outerBoxStyles }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...innerBoxStyles,
          }}
        >
          <TabList onChange={handleChange} aria-label="chatroom tabs" variant="scrollable" scrollButtons="auto">
            {tabList.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </TabList>
        </Box>

        {panelList.map((panel) => (
          <TabPanel key={panel.value} value={panel.value}>
            {panel.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default ItemTabs;
