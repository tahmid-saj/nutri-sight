import React, { useContext } from 'react';
import { StyledItemContainer, StyledItemTitle, StyledDeleteIcon } from './notifications-list.styles';
import { NotificationAuthenticated } from '../../../../contexts/signed-in/notifications/notifications.types';
import { NotificationsContext } from '../../../../contexts/signed-in/notifications/notifications.context';

export interface AlertProps {
  notification: NotificationAuthenticated
}

const AlertItem: React.FC<AlertProps> = ({ notification }) => {
  const { deleteNotification } = useContext(NotificationsContext)

  const onDelete = () => {
    deleteNotification(notification)
  }

  return (
    <StyledItemContainer>
      <StyledItemTitle>{notification.exerciseName} | {notification.exerciseDate}</StyledItemTitle>
      <StyledDeleteIcon onClick={onDelete} />
    </StyledItemContainer>
  );
};

export default AlertItem;