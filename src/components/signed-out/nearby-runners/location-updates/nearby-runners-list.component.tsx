import React, { useContext } from 'react';
import NearbyUserItem from './nearby-runner.component';
import { StyledListContainer } from './nearby-runners-list.styles';
import { useNearbyRunnersContext } from "../../../../contexts/signed-out/nearby-runners/nearby-runners.context"
 

const NearbyRunnersList: React.FC = () => {
  const { mapLocations } = useNearbyRunnersContext()

  return (
    <StyledListContainer>
      {mapLocations?.map((mapLocation, index) => (
        <NearbyUserItem key={index} mapLocation={ mapLocation } />
      ))}
    </StyledListContainer>
  );
};

export default NearbyRunnersList;