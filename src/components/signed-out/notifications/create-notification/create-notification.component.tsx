import { Typography } from "@mui/material"
import { CreateNotificationContainer } from "./create-notification.styles.tsx"
import React, { useContext, useState } from "react"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { NotificationsContext } from "../../../../contexts/signed-out/notifications/notifications.context.tsx";

const initialFormFields = {
  exerciseName: "Pushups",
  exerciseDate: "2027-01-01",
  email: ""
}

const defaultFormFields = {
  exerciseName: "",
  exerciseDate: "",
  email: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const CreateAlert = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { createNotification, deleteAllNotifications } = useContext(NotificationsContext)
  
  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const deleteNotifications = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deleteAllNotifications()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.exerciseName === "" || formFields.exerciseDate === "") {
      return
    }

    // create notif
    createNotification({
      ...formFields
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <CreateNotificationContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Create a notification
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Exercise"
            type="text"
            required
            onChange={handleChange}
            name="exerciseName"
            value={formFields.exerciseName}
          />

          <FormInput type="date" required onChange={ handleChange }
                      name="exerciseDate" value={ formFields.exerciseDate }></FormInput>
          
          <FormInput
            label="Email"
            type="text"
            required
            onChange={handleChange}
            name="email"
            value={formFields.email}/>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Create</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                  <Button type="button" onClick={deleteNotifications}>
                    Delete All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </CreateNotificationContainer>
  );
}

export default CreateAlert