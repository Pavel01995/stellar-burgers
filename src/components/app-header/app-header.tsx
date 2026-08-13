import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);

  const userName = user?.name || 'Личный кабинет';

  return <AppHeaderUI userName={userName} />;
};
