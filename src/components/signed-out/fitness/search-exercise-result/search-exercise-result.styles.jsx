import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const FitnessSearchResultInfo = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  padding: 0.5%;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR_CODES.general["1"]};
    border: none;
  }
`