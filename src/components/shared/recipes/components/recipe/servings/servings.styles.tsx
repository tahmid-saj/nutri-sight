import styled from "styled-components";

export const ServingsContainer = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
`

export const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`

export const ServingsQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`

export const ServingsButtonsContainer = styled(ServingsQuantityContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DecreasingServings = styled(ServingsQuantityContainer)`
  &:hover {
    background-color: #ff9c9c;
    border-radius: 5rem;
    border: none;
    cursor: pointer;
  }
`

export const IncreaseServings = styled(ServingsQuantityContainer)`
  &:hover {
    background-color: lightgreen;
    border-radius: 5rem;
    border: none;
    cursor: pointer;
  }
`