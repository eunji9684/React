import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";
import { signin } from "./components/ApiService";
import { Mysite } from "./AppRouter";
const Login = ()=>{

    //리턴밖에다가 onsubmib 이벤트 핸들러 구성합니다.
        const handleSubmit = (e) =>{
            e.preventDefault();
        
            //e.preventDefault();//현재 event 큐의 모든 내용을 비우고, 이 이벤트부터 저리하라는 뜻
            //또 하나는 이걸 사용하면, refresh를 방지합니다.

            //target 을 form 으로 지정하고, 즉(e.target)을 폼에서 설정하고
            //FormData 객체를 설정하면, 자동으로 폼 내부의 target을 구분해서
            //value 값을 할당할 수 있음.
        const fDate =  new FormData(e.target);//애가 폼전체를 가르키면서 value를 자동으로 뽑아낸다
        //getter를 이용해서 변경된 값을 대입합니다.
        const username = fDate.get("username");
        const password = fDate.get("password");

        console.log({username:username,password:password});
        //signin()을 이용 비동기 통신을 전송하는데, 값으로 json으로 생성해서 보내야함.
        signin({username:username,password:password});
       
    }
    

    return(
        
        <Container component={"main"} maxWidth="xs" style={{marginTop:"8%"}}>
            <Grid container spacing={2}  style={{justifyContent:"center", marginBottom:"30px"}}>
                <Grid item xs={5}>
                    <Typography component={"h1"} variant="h5" >로그인 페이지</Typography>
                    
                </Grid>
            </Grid>

            {/* Form 컴포넌트 폼 구성 */}
            <form noValidate onSubmit={handleSubmit}>
                {/* 하위에 inputs, button을 구성하고 이벤트 적용합니다. */}
                {" "}
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        lable="아이디"
                        name="username"
                        autoComplete="username"    
                        
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        lable="패스워드"
                        name="password"
                        autoComplete="current-password" 
                    />
                </Grid>

                {/* 버튼생성 */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" style={{width:"50%"}} variant="contained" color="primary">
                        로그인
                    </Button>
                </Grid>
                </Grid>
            </form>

</Container>
    );

}
export default Login;