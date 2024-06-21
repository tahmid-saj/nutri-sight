import { createContext, useEffect, useState } from "react";
import { COMMON_SPACING } from "../../../utils/constants/shared.constants";

// initial state
export const ResponsiveStylingContext = createContext({
  mobileOpen: false,
  isClosing: false,
  closedDrawer: false,
}) 

// context provider
export const ResponsiveStylingProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const value = { mobileOpen, isClosing, 
    setMobileOpen, setIsClosing }

  return (
    <ResponsiveStylingContext.Provider value={ value }>
      { children }
    </ResponsiveStylingContext.Provider>
  )
}