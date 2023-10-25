import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout, signin } from './components/ApiService';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(''); // 초기값을 빈 문자열로 설정
  const [role, setRole] = useState('');
  
  useEffect(() => {
    const userToken = localStorage.getItem('ACCESS_TOKEN');
    if (userToken) {
        setIsLoggedIn(true);
        const storedName = localStorage.getItem('USER_NAME');
        const storedRole = localStorage.getItem('USER_ROLE');
        
        setName(`${storedName}`);
        setRole(storedRole);
        if (storedRole === '0') {
            setRole('USER');
        } else if (storedRole === '1') {
            setRole('ADMIN');
        }

        console.log('name:', storedName);
        console.log('role:', storedRole);
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
            <Typography variant="h6"marginLeft={"800px"}>
              Eunji`s 홈페이지
            </Typography>
          </Grid>
          <Grid item justifyContent={"end"}>
            {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
  {name && <span><b  style={{color:"#0f1b4f"}}>{name}님</b> <span>
  {' ('}
  <span style={{ color: role === 'USER' ? 'blue' : role === 'ADMIN' ? 'red' : 'black' }}>
    {role}
  </span>
  {') 입니다.'}
</span>
</span>}
</Typography>

                <Button color="inherit" onClick={logout} style={{marginLeft:"15px"}}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={handleLoginClick}>
                  로그인
                </Button>
                <Button color="inherit" onClick={handleSignupClick}>
                  회원가입
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
