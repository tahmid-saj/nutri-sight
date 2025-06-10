import { useState } from "react"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { useNearbyRunnersContext } from "../../../../contexts/signed-in/nearby-runners/nearby-runners.context"
import { StartLocationUpdatesContainer } from "./start-location-updates.styles"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { Typography } from "@mui/material"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const StartLocationUpdates = () => {
  const [locationUpdateEnabled, setLocationUpdateEnabled] = useState(false)
  const { startLocationUpdates, exitLocationUpdates } = useNearbyRunnersContext()

  const exitUpdates = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    exitLocationUpdates()

    setLocationUpdateEnabled(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // start location updates
    startLocationUpdates()

    setLocationUpdateEnabled(true)
  }

  return (
    <StartLocationUpdatesContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Start Location Updates
        </Typography>

        <form onSubmit={handleSubmit}>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit" disabled={ locationUpdateEnabled }
                    >Start</Button>
                  <Button type="button" onClick={exitUpdates}  disabled={ !locationUpdateEnabled }>
                    Exit Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </StartLocationUpdatesContainer>
  );
}

export default StartLocationUpdates