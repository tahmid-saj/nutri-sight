import styled from "styled-components";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";

export const SearchResultsContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  padding: 1% 1% 1% 0%;
`

export const SearchResultContainer = styled.div`
  background-color: ${COLOR_CODES.general["0"]};

  &:hover {
    background-color: ${COLOR_CODES.general["1"]};
    border: none;
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`