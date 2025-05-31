import React, { useContext } from 'react';
import AlertItem from './notification.component';
import { StyledListContainer } from './notifications-list.styles';
import { NotificationsContext } from '../../../../contexts/signed-out/notifications/notifications.context';

const AlertsList: React.FC = () => {
  const { notifications } = useContext(NotificationsContext)

  return (
    <StyledListContainer>
      {notifications?.map((notification, index) => (
        <AlertItem key={index} notification={ notification } />
      ))}
    </StyledListContainer>
  );
};

export default AlertsList;