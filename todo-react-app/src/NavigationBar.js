import React from "react";
import { AppBar, Button, Toolbar, Typography, Grid } from "@mui/material"; // Grid를 import

import { logout } from "./components/ApiService";

const NavigationBar = ({ isLoggedIn, onLogout, onLogin }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent={"space-between"} container> {/* Grid 컴포넌트 사용 */}
          <Grid item>
            <Typography variant="h6">
              오늘의 할일
            </Typography>
          </Grid>

          <Grid item>
          <Button color="inherit" onClick={logout}>
                회원가입
              </Button>
              <Button color="inherit" onClick={logout}>
                로그아웃
              </Button>
          
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
