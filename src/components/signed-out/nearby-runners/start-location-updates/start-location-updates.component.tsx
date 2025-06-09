import { useState } from "react"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { useNearbyRunnersContext } from "../../../../contexts/signed-out/nearby-runners/nearby-runners.context"
import { StartLocationUpdatesContainer } from "./start-location-updates.styles"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { Typography } from "@mui/material"

const initialFormFields = {
  name: "John"
}

const defaultFormFields = {
  name: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const StartLocationUpdates = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const [locationUpdateEnabled, setLocationUpdateEnabled] = useState(false)
  const { startLocationUpdates, exitLocationUpdates } = useNearbyRunnersContext()

  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const exitUpdates = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    exitLocationUpdates()

    setLocationUpdateEnabled(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (formFields.name === "") {
      return
    }

    // start location updates
    startLocationUpdates(formFields.name)

    setLocationUpdateEnabled(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <StartLocationUpdatesContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Start Location Updates
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={formFields.name}
            disabled={ locationUpdateEnabled }
          />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit" disabled={ locationUpdateEnabled }
                    >Start</Button>
                  <Button type="button" onClick={resetFormFields} disabled={ locationUpdateEnabled }>
                    Clear
                  </Button>
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