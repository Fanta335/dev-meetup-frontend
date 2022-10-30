import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    if (isAuthenticated) {
      navigate('/app');
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, navigate]);

  return (
    <Button
      variant="contained"
      onClick={handleStart}
      size="large"
      sx={{ bgcolor: '#111', color: '#fff' }}
    >
      {isAuthenticated ? '開く' : 'ログイン'}
    </Button>
  );
};

export default LoginButton;
