import { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";
import { signup ,checkEmail,checkUsername } from "./components/ApiService";
import PopupPostCode from "./PopupPostCode";
import { Mysite } from "./AppRouter";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";
import AppRouter from "./AppRouter";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [duplicateEmailMessage, setDuplicateEmailMessage] = useState(""); // 이메일 중복 메시지 추가
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(false); // 가입 버튼 활성화 여부

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [duplicateUsernameMessage, setDuplicateUsernameMessage] = useState("");


  const [address, setAddress] = useState(""); // 주소 상태 추가
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isPopupVisible, setPopupVisible] = useState(false);
  



  const handleOpenPopup = () => {
   
    setPopupVisible(true);
  };


const handleClosePopup = () => {
  setPopupVisible(false);
};

const handleAddressChange = (newAddress) => {
  setAddress(newAddress);
  setIsAddressValid(true);
 
  setPopupVisible(false);
};

  const handleUsernameChange = async (newUsername) => {
    setUsername(newUsername);
    setDuplicateUsernameMessage('');
    setIsUsernameValid(true);
    setUsernameError('');

    if (newUsername.trim() === '') {
      setUsernameError('아이디를 입력해 주세요.');
      setIsSignupButtonDisabled(true);
    } else {
      const response = await checkUsername(newUsername);
      if (response.message === '중복된 아이디입니다.') {
        setIsUsernameValid(false);
        setUsernameError(response.message);
        setIsSignupButtonDisabled(true);
      } else if (response.message === '유효한 아이디입니다.') {
        setIsUsernameValid(true);
        setUsernameError('');
        setIsSignupButtonDisabled(false);
      }
    }
  };

  const handleEmailChange = async (newEmail) => {
    setEmail(newEmail);
    setIsEmailValid(true); // 이메일 유효성 초기화
    setIsSignupButtonDisabled(false); // 가입 버튼 활성화
    setEmailError(''); // 이메일 에러 초기화
  
    if (newEmail.trim() === '') {
      setEmailError('이메일을 입력해 주세요.');
      setIsSignupButtonDisabled(true); // 가입 버튼 비활성화
    } else if (!isValidEmail(newEmail)) {
      setEmailError('@와 올바른 도메인 "."이 포함되어야합니다.');
      setIsSignupButtonDisabled(true); // 가입 버튼 비활성화
    } else {
      const response = await checkEmail(newEmail); // 이메일 중복 확인
      if (response.message === '중복된 이메일 주소입니다.') {
        setIsEmailValid(false);
        setEmailError(response.message); // 중복된 이메일 메시지 설정
        setIsSignupButtonDisabled(true); // 가입 버튼 비활성화
      } else if (response.message === '유효한 이메일 주소입니다.') {
        setIsEmailValid(true);
        setEmailError('');
        setIsSignupButtonDisabled(false); // 가입 버튼 활성화
      }
    }
  };


    const isValidEmail = (email) => {
        if (email.includes('@')) {
          const parts = email.split('@');
          if (parts.length === 2 && parts[1].includes('.')) {
            return true;
          }
        }
        return false;
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");
      const passwordConfirm = formData.get("passwordConfirm");
      const name = formData.get("name");
      const userEmail = formData.get("email");
      const phone = formData.get("phone");
      const addr = formData.get("addr");
  
      console.log({ username, password, passwordConfirm, name, email: userEmail, phone, addr });

      const userData = {
        username,
        password,
        name,
        email,
        phone,
        addr: address,
        addr
      };
  
  
      if (!username || !password || !passwordConfirm || !name || !userEmail || !phone || !addr) {
        alert("모든 필수 필드를 입력해주세요.");
        return;
      }
  
      
      if (password !== passwordConfirm) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
  
      // 서버로 데이터 전송
      await signup({ username, password, name, email: userEmail, phone, addr }).then((Response) => {
        alert("회원가입이 완료되었습니다.");
         window.location.href = "/login";
      });
    };
  

  
    return (
      <Container component={"main"} maxWidth="xs" style={{ marginTop: "3%" }}>
        <Grid container spacing={2} style={{ justifyContent: "center", marginBottom: "30px" }}>
          <Grid item xs={6}>
            <Typography component={"h1"} variant="h5">회원가입 페이지</Typography>
          </Grid>
        </Grid>
  
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="아이디"
                name="username"
                autoComplete="username"
                onChange={(e) => handleUsernameChange(e.target.value)} // 아이디 변경 핸들러 추가
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
            {duplicateUsernameMessage && <p className="error-message">{duplicateUsernameMessage}</p>}
              
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="패스워드"
                name="password"
                autoComplete="current-password"
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="passwordConfirm"
                label="패스워드확인"
                name="passwordConfirm"
                autoComplete="current-passwordConfirm"
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                autoComplete="name"
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailError && <p className="error-message">{emailError}</p>}
              {duplicateEmailMessage && <p className="error-message">{duplicateEmailMessage}</p>}
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="전화번호"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
  
              <Grid item xs={2}>
              <Button
                type="button"
                style={{ width: "50%" ,padding:"0"}}
                variant="contained"
                color="secondary"
                onClick={handleOpenPopup}
              >
                주소 찾기
              </Button>
              <PopupPostCode
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          onAddData={handleAddressChange}
        />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addr"
                label="주소"
                name="addr"
                autoComplete="addr"
                value={address}
              />
          </Grid>
          <Grid item xs={12}>
          <TextField
  variant="outlined"
  required
  fullWidth
  id="addr"
  label="주소 (나머지 주소 포함)"
  name="addr"
  autoComplete="addr"
/>
</Grid>
       
            
  
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
  type="submit"
  style={{
    width: "50%",
    backgroundColor: isSignupButtonDisabled ? "#CCCCCC" : "#739CBF",
    color: "white"
  }}
  disabled={isSignupButtonDisabled}
>
  가입하기
</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  };
  
  export default Signup;