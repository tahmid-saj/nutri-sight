import styled from "styled-components";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";

export const SearchResultContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  margin: 0.5%;
  background-color: ${COLOR_CODES.general["5"]};

  &:hover {
    background-color: ${COLOR_CODES.general["1"]};
    border: none;
  }
`