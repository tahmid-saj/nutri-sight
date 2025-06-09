import React, { useContext } from 'react';
import { StyledItemContainer, StyledItemTitle } from './nearby-runners-list.styles';


export interface NearbyUserItemProps {
  mapLocation: any
}

const NearbyRunnerList: React.FC<NearbyUserItemProps> = ({ mapLocation }) => {

  return (
    <StyledItemContainer>
      <StyledItemTitle>{mapLocation.userId} | {mapLocation.locationUpdate}</StyledItemTitle>
    </StyledItemContainer>
  );
};

export default NearbyRunnerList;