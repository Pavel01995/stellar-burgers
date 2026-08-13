import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, getError } from '../../services/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const rawError = useSelector(getError) || location.state?.error;
  const errorText = rawError === 'You should be authorised' ? '' : rawError;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password })) // или registerUser
      .unwrap()
      .then(() => {
        const state = location.state as { from?: { pathname: string } };
        const from = state?.from || { pathname: '/' };
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
