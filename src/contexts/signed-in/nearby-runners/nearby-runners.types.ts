import { ReactNode } from "react";

export type NearbyRunnersContextType = {
  locationUpdate: LocationUpdate | undefined,
  mapLocations: MapLocationUpdate[],

  startLocationUpdates: () => void,
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