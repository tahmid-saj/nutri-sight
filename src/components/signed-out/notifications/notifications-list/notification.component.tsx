import React, { useContext } from 'react';
import { StyledItemContainer, StyledItemTitle, StyledDeleteIcon } from './notifications-list.styles';
import { NotificationsContext } from '../../../../contexts/signed-out/notifications/notifications.context';
import { NotificationUnauthenticated } from '../../../../contexts/signed-out/notifications/notifications.types';

export interface AlertProps {
  notification: NotificationUnauthenticated
}

const AlertItem: React.FC<AlertProps> = ({ notification }) => {
  const { deleteNotification } = useContext(NotificationsContext)

  const onDelete = () => {
    deleteNotification(notification)
  }

  return (
    <StyledItemContainer>
      <StyledItemTitle>{notification.exerciseName} | {notification.exerciseDate} | {notification.email}</StyledItemTitle>
      <StyledDeleteIcon onClick={onDelete} />
    </StyledItemContainer>
  );
};

export default AlertItem;