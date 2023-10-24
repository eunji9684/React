import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout, signin } from './components/ApiService'; // 로그아웃 함수와 signin 함수를 import

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('ACCESS_TOKEN');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/Signup');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#739CBF' }}>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">
              오늘의 할일
            </Typography>
          </Grid>
          <Grid item>
          <Button color="inherit" onClick={isLoggedIn ? logout : handleLoginClick}>
  {isLoggedIn ? "로그아웃" : "로그인"}
</Button>
{!isLoggedIn && ( // isLoggedIn이 false일 때 (즉, 로그인 상태가 아닐 때)
  <Button color="inherit" onClick={handleSignupClick}>
    회원가입
  </Button>
)}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
