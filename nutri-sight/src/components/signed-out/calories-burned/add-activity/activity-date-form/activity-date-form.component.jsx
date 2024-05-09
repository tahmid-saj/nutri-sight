import Button from "../../../../shared/button/button.component"
import "./activity-date-form.styles.scss"
import { useState } from "react"
import FormInput from "../../../../shared/form-input/form-input.component"

const defaultFormFields = {
  activity: "",
  dateTracked: ""
}

const ActivityDateForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="activity-date-form-container">
      <form onSubmit={ handleSubmit }>
        <h4>Date tracked</h4>
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