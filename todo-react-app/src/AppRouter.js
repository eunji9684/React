//2023-10-16
//Router : 서버의 redirect 와 비슷한 개념. 지정된 path의 요청이 오면, 지정된 컴포넌트가 응답하도록
//요청분기를 해주는 API
import {Box, Typography} from '@mui/material'
import React, {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import App from './App';

export function Mysite(){
    return(
        <Typography variant='body2' color="InfoText" align='center'>
            {"내가 만든 로긴 라우터"}
            이제 거의 마지막이네요...{new Date().getFullYear()}{"."}
        </Typography>  
    );
}
const AppRouter = () =>{
    return(
        <div>
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<App></App>}/>
                <Route path='login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>

            <Box mt={5}>
               <Mysite/></Box>

        </div>

    )
}
export default AppRouter;