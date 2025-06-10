import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { LocationUpdate, MapLocationUpdate, NearbyRunnersContextType, 
  NearbyRunnersProviderProps } from "./nearby-runners.types";
import { LOCATION_UPDATE_INTERVAL, NEARBY_RUNNERS_WS_ACTIONS } from "../../../utils/constants/nearby-runners.constants";
import geohash from "ngeohash"

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

// helpers
const updateMapLocations = (mapLocations: MapLocationUpdate[], mapLocation: any) => {
  let mapLocationInMap = false
  let newMapLocations = mapLocations.map((locationUpdate) => {
    if (locationUpdate.userId === mapLocation.userId) {
      mapLocationInMap = true
      locationUpdate.userName = mapLocation.name
      locationUpdate.location = mapLocation.locationUpdate
      locationUpdate.channel = mapLocation.channel
    }

    return locationUpdate
  })

  if (!mapLocationInMap) newMapLocations.push({
    userId: mapLocation.userId,
    userName: mapLocation.name,
    location: mapLocation.locationUpdate,
    channel: mapLocation.channel
  })
  
  return newMapLocations
}

export const NearbyRunnersContext = createContext<NearbyRunnersContextType | undefined>(undefined)

export const NearbyRunnersProvider: React.FC<NearbyRunnersProviderProps> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const locationUpdateIntervalRef = useRef<number | null>(null);
  const [locationUpdate, setLocationUpdate] = useState<LocationUpdate | undefined>(undefined)
  const [mapLocations, setMapLocations] = useState<MapLocationUpdate[]>([])
  // mapLocation structure:
  // {
  //   userId,
  //   name,
  //   location
  // }

  const currentUser = useSelector(selectCurrentUser)


  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_API_NEARBY_RUNNERS_WS_URL!)

    ws.current.onopen = () => {
      console.log("Connected to websocket")
    }

    ws.current.onmessage = (event) => {
      try {
        console.log("Received: ", event.data)
        const data = JSON.parse(event.data)

        // loop through mapLocations and update the map locations
        const newMapLocations = updateMapLocations(mapLocations, data)
        setMapLocations(newMapLocations)
      } catch (err) {
        console.log("Failed to receive location update: ", err)
      }
    }

    ws.current.onclose = () => {
      console.log("Websocket closed")
    }

    ws.current.onerror = (error) => {
      console.error("Websocket error: ", error)
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const sendLocationUpdate = (locationUpdate: LocationUpdate) => {
    setLocationUpdate(locationUpdate)
    
    if (ws.current?.readyState === WebSocket.OPEN) {
      const action = NEARBY_RUNNERS_WS_ACTIONS.sendLocationUpdate

      console.log("sending location update: ", locationUpdate)

      ws.current.send(JSON.stringify({
        action,
        ...locationUpdate
      }))
    } else {
      console.log("Websocket is not open");
    }
  }

  const startLocationUpdates = () => {
    const lat = 37.78
    const long = -122.42
    const positionGeohashString = geohash.encode(lat, long, 8)

    // subscribe to channel
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: NEARBY_RUNNERS_WS_ACTIONS.subscribe,
        userId: currentUser?.email,
        name: currentUser?.displayName,
        location: positionGeohashString
      }))
  
      // assign timerID of setInterval - note that we have to be clear that we're using the window object
      locationUpdateIntervalRef.current = window.setInterval(async () => {
        sendLocationUpdate({
          userId: currentUser?.email!,
          name: currentUser?.displayName!,
          location: positionGeohashString
        })
      }, LOCATION_UPDATE_INTERVAL)

    } else {
      console.log("Websocket is not open");
    }
  }

  const exitLocationUpdates = () => {
    const lat = 37.78
    const long = -122.42
    const positionGeohashString = geohash.encode(lat, long, 8)

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: NEARBY_RUNNERS_WS_ACTIONS.unsubscribe,
        userId: currentUser?.email,
        name: currentUser?.displayName,
        location: positionGeohashString
      }))

      ws.current.close()
      
      // clear the location update set interval timer
      if (locationUpdateIntervalRef.current) {
        clearInterval(locationUpdateIntervalRef.current)
        locationUpdateIntervalRef.current = null
      }
    } else {
      console.log("Websocket is not open");
    }
  }

  return (
    <NearbyRunnersContext.Provider value={{ locationUpdate, mapLocations,
      sendLocationUpdate, startLocationUpdates, exitLocationUpdates }}>
      { children }
    </NearbyRunnersContext.Provider>
  )
}

export const useNearbyRunnersContext = () => {
  const context = useContext(NearbyRunnersContext)
  if (!context) throw new Error("useNearbyRunnersContext must be used within WebSocketProvider")
    return context
}