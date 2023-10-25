import "./App.css";
import {AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography} from "@mui/material";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { orange, pink } from "@mui/material/colors";
import AddTodo from "./AddTodo";
import { call, logout , signin ,signup } from "./components/ApiService";
import NavigationBar from "./NavigationBar";
import Signup from "./Signup";




//2023-10-13 이클립스 생성후 리액트작업시작
const componentDidMount = () => {
  //여기서는 우리 로컬서버의 Todo 에 비동기 통신을 이용해서 요청을 보낼코드를 작성합니다.
  const requestOptions = {
    //브라우저가 아닌 직접 요청을 보내기 때문에 요청 방식과, header 정보를 직접 정의 합니다.
    method:"GET",
    headers:{"Content-Type" :"application/json"}
  }

  //XHR(ajax)와 같은 역할을 하는 대표적 비동기 통신 API 인 fetch 를 이용해서 서버에 요청을 보냄
  fetch ("localhost/todo",requestOptions) //fetch는 통신결과를 담은 response 객체를 받아옵니다.
  //비동기통신은 true/false반환한다.
  //따라서 이 객체를 처리할 콜백을 then 에 정의합니다.
  .then((reponse) => 
    reponse.json());
}
  // .then((response) => {
  //     this.setStatus({})
  // });

  const App = () => {
    //배열을 초기화하고 상태관리를 해주겠다 원본과 수정본
    const[items,setItems] = useState([]);//지금 아무것도 할일이 없어서 빈배열을 준다.
    //일이 추가될때마다 items에 데이터가 담긴다 items는 원본이라 원본불변의 법칙을 지켜야한다.
    const[loading,Setloading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    // const handleLogin = () => {
    //   // 사용자 로그인 로직을 수행합니다.
    //   // 로그인에 성공하면 상태를 업데이트합니다.
    //   setIsLoggedIn(true);
    // };
  
    // const handleLogout = () => {
    //   // 사용자 로그아웃 로직을 수행합니다.
    //   // 로그아웃에 성공하면 상태를 업데이트합니다.
    //   setIsLoggedIn(false);
    // };

    //화면이 렌더링되자마자 실행되는애라서 메서드를 이용해서 화면에 접근합니다.
    //여기서 backEnd의 todo 를 호출해보도록 합니다.
    //테스트 해보는애?
    useEffect(() => {
      call("/todo", "GET", null)
        .then((response) => {
          if (response && response.data) {
            setItems(response.data);
            Setloading(false);
          }
        });
    }, []);

    //할일 항목을 추가하는 이벤트 정의합니다.
    //2023-10-13 1교시 추가작업
   //AddTodo에서 title.target.vaule에 담긴 타이틀만 여기로 넘어온다. 그리고 DB로 밀어넣는애다.
      //item.id = "id-" + items.length;
      //item.done = false;//{id:id-0, done:false, title:""}      

      //item 추가.,.. 반드시 setter로 해야함.. 원본..불변도
      //setitems([...items,item]);

      //fetch통해 데이터 보내야하니까
      const addItem = (item) => {
        // 아이템을 서버에 추가하는 비동기 작업 시작
        call("/todo", "POST", item)
          .then((res) => {
            setItems(res.data); // 비동기 작업이 완료된 후에 아이템 목록을 업데이트
          })
          .catch((error) => {
            console.error("에러 발생 : ", error);
          });
      };
    
    
  //작성후 Addtodo에 연결해봅니다.

    //항목 수정을 위한 이벤트 정의
    const editItem = (item) =>{
      call("/todo","PUT", item)
      .then((response) =>
      setItems(response.data));
      
    }

    
    const deleteItem=(item) =>{
      call("/todo","DELETE",item)
      .then((response) => 
      setItems(response.data));
      
     // const newItems = items.filter((e) => e.id !== item.id);
      //Todo.js에 보내줘야한다.
    }
    //함수형인 경우엔 useEffect를 사용해야 합니다.
    //componentDidMount 와 같은 기능인데, 얘는 클래스 형태로 정의시에 사용해야 합니다.
    
    

    //메인 App에 Todo를 저장하는 작업을 먼저 수행합니다.
    //만약 아이템즈가 하나라도 존재한다면  하나의 덩어리로 todoItem에 담겠다.
    //하나의 렌더링 객체
    let todoItems = items.length > 0 && (
      //paper 벽지같은애
      <Paper style ={{margin:16, background : "#B4D9A9", marginTop:"3px"}}>
        <List>
        {/* 만약1 이미 존재하는 Todo 리스트가 있다면, props 를 주고 생성합니다. */}
        {
          items.map((item) => (
            <Todo
              item={item}
              key={item.id}//이게 그대로 todoItem으로 넘어간다. 프롭스를 이용하여 아이템은 tododptj 받는다.
              editItem={editItem}
              deleteItem={deleteItem}
             
              />
          ))
        }
        </List>
      </Paper>
    );
  

    // let navigationBar =(
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Grid justifyContent={"space-between"} container>
    //         <Grid item>
    //           <Typography variant="h6">
    //             오늘의 할일
    //           </Typography>
    //         </Grid>
    //         <Grid item>
    //           <Button color="inherit" onClick={logout}>
    //             로그아웃
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    // );
    //로딩중이 아닐때 렌더링할 부분
    let todoListPage = (
      <div>
       
        <Container maxWidth="md">
          <AddTodo addItem={addItem}></AddTodo>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )
    let loadingPage=<h1>로딩중 입니다...</h1>
    let content = loading ? loadingPage : todoListPage;


    if(!loading){
      content = todoListPage;
    }
    return(//리턴할때만 블락으로 묶어서 친다.
    <div className="App">
      
        {content}
    </div>
    
    );
      }
      


export default App; //이 컴포넌트가 타 컴포넌트에 호출되어 사용되려면 이전처럼 export default 함수명
//을 해줘야 모듈 컴포넌트가됨.
