import { ReactNode } from "react";

export type NearbyRunnersContextType = {
  userInfo: LocationUpdateUserInfo | undefined,
  locationUpdate: LocationUpdate | undefined,
  mapLocations: MapLocationUpdate[],

  startLocationUpdates: (name: string) => void,
  sendLocationUpdate: (locationUpdate: LocationUpdate) => void,
  exitLocationUpdates: () => void
}

export interface NearbyRunnersProviderProps {
  children: ReactNode
}

export type LocationUpdate = {
  userId: string,
  name: string,
  location: string
}

export type MapLocationUpdate = {
  userId: string,
  userName: string,
  location: string,
  channel: string
}

export type LocationUpdateUserInfo = {
  userId: string,
  name: string
}