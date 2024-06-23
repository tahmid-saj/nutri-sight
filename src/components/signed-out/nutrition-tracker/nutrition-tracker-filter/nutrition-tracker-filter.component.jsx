import Button from "../../../shared/button/button.component";
import FormInput from "../../../shared/form-input/form-input.component";
import "./nutrition-tracker-filter.styles.jsx"
import { NutritionTrackerFilterContainer, FilterButtonsContainer } from "./nutrition-tracker-filter.styles.jsx"

import { useState, useContext } from "react"
// import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch } from "react-redux"
import { filterDayTracked, clearDayTrackedFilter } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  filterStartDate: "",
  filterEndDate: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
}

const NutritionTrackerFilter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  // const { filterDayTracked, clearDayTrackedFilter } = useContext(NutritionTrackerContext)
  const dispatch = useDispatch()
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formFields.filterStartDate === "" && formFields.filterEndDate === "" && !formFields.filterStartDate && !formFields.filterEndDate) {
      
      return
    }
    
    dispatch(filterDayTracked(formFields))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    dispatch(clearDayTrackedFilter())
  }

  return (
    <NutritionTrackerFilterContainer>
      <div className="container">
        <SimplePaper styles={ paperStyles }>
          <form onSubmit={ handleSubmit }>
            <Typography variant="h6">Filter by date range</Typography>
            <FormInput type="date" onChange={ handleChange }
                        name="filterStartDate" value={ formFields.filterStartDate }></FormInput>
            
            <FormInput type="date" onChange={ handleChange }
                        name="filterEndDate" value={ formFields.filterEndDate }></FormInput>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                  <Button type="submit">Filter</Button>
                  <Button type="button" onClick={ handleClearFilter }>Clear</Button>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </div>
    </NutritionTrackerFilterContainer>
  )
}

export default NutritionTrackerFilter