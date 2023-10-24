//2023-10-16
//Router : 서버의 redirect 와 비슷한 개념. 지정된 path의 요청이 오면, 지정된 컴포넌트가 응답하도록
//요청분기를 해주는 API
import {Box, Typography} from '@mui/material'
import React, {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

import App from './App';
import NavigationBar from './NavigationBar';

export function Mysite(){
    return(
        <Typography variant='body2' color="InfoText" align='center'>
            {"example project"}
            공통 라우터{new Date().getFullYear()}{"."}
        </Typography>  
    );
}
const AppRouter = () =>{
    return(
        <div>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                <Route path='/' element={<App></App>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup />} /> 
               
                </Routes>
            </BrowserRouter>

            <Box mt={5}>
               <Mysite/></Box>

        </div>

    )
}
export default AppRouter;