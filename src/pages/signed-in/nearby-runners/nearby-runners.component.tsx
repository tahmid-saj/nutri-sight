import { NearbyRunnersContainer } from "./nearby-runners.styles"
import StartLocationUpdates from "../../../components/signed-in/nearby-runners/start-location-updates/start-location-updates.component"
import { Divider } from "@mui/material"
import { useNearbyRunnersContext } from "../../../contexts/signed-in/nearby-runners/nearby-runners.context"
import NearbyRunnersList from "../../../components/signed-in/nearby-runners/location-updates/nearby-runners-list.component"

const NearbyRunnersPage = () => {
  const { mapLocations } = useNearbyRunnersContext()

  return (
    <div>
      <NearbyRunnersContainer>
        <StartLocationUpdates/>

        <Divider/>

        {
          mapLocations !== undefined && mapLocations.length !== 0 && <NearbyRunnersList/>
        }
      </NearbyRunnersContainer>
    </div>
  )
}

export default NearbyRunnersPage