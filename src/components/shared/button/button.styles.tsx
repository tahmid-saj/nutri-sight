import styled from "styled-components"

export const BaseButton = styled.button<React.ButtonHTMLAttributes<HTMLButtonElement>>`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  // background-color: rgb(234, 210, 210);
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

export const GoogleSignInButton = styled(BaseButton)`
  &.google-sign-in,
  &.regular-button {
    background-color: #fdca00e3;
    color: black;

    &:hover {
      background-color: #b08d00;
      border: none;
    }
  }
`

export const InvertedButton = styled(BaseButton)`
  &.inverted {
    background-color: black;
    color: #fdca00e3;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`

export const RoundedButton = styled(BaseButton)`
  &.button-rounded {
    border-radius: 1.5rem;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`