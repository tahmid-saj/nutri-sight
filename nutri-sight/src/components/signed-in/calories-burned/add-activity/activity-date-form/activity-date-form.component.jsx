import Button from "../../../../shared/button/button.component"
import "./activity-date-form.styles.scss"
import { useState, useContext } from "react"
import FormInput from "../../../../shared/form-input/form-input.component"

import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context"

const defaultFormFields = {
  activity: "",
  dateTracked: ""
}

const ActivityDateForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { searchActivity } = useContext(CaloriesBurnedContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await searchActivity(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="activity-date-form-container">
      <form onSubmit={ handleSubmit }>
        <h4>Track the calories of an activity</h4>
        <FormInput type="date" required onChange={ handleChange }
                    name="dateTracked" value={ formFields.dateTracked }></FormInput>
        
        <FormInput label="Activity" type="text" required onChange={ handleChange }
                            name="activity" value={ formFields.activity }></FormInput>
        
        <Button type="submit">Search Activity</Button>
      </form>
    </div>
  )
}

export default ActivityDateForm