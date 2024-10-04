import { ReactNode } from "react";

// user types

export interface UserContextType {
  currentUser: any | undefined;
}

export interface UserProviderProps {
  children: ReactNode;
}