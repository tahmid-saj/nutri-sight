import styled from "styled-components";

export const AddMicronutrientsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .add-micronutrients-button:hover {
    background-color: #ffea97;
    border-radius: 2rem;
    border: none;
    cursor: pointer;
  }
`

export const MicronutrientContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;

  .remove-micronutrients-button {
    justify-content: center;
    align-items: center;
  }

  .remove-micronutrients-button:hover {
    background-color: #ff9c9c;
    border-radius: 5rem;
    border: none;
    cursor: pointer;
  }
`