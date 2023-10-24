import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

//2023-10-12
//할일을 계속 추가해주는 애들이기때문에 additem으로 받는다.
const AddTodo =(props) => {//AddItem을 Props로 받는다.
    
    //사용자 입력 처리할 Obj
    const[item,setItem] = useState({title:""});//상태변경이 일어나기때문에 useState로 해준다.
     //초기값으로 title 공백을 주겠다. 아이템을 객체로 만들겠다. {{title:""}}아이템이라는 객체에 title은 초기속성값
     //title이 onChange이벤트를 통해서 여기에 담긴다. 
    const addItem = props.addItem;

    //onButtonClick 구현하기 10-13 밑에 까지 핸들러이벤트 추가시작
    //아이템을 파라미터로 넘겨서 addItem으로 셋업
    const onButtonClick = () =>{
        addItem(item);
        setItem({title : ""});//타이틀이 추가되었기때문에 공백으로 묶어줍니다.
    }

    //Enter 키가 입력되면, 입력된 todo 제목을 추가하도록, 즉 + 버튼을 클릭한 효과와 같게 만듭니다.
    const enterEventHandler = (e) =>{
        if(e.key === 'Enter'){
            onButtonClick();
        }
    }
    
    //타겟을 내가지정한다음 value를 setItem에 담는다.
    //사용자의 입력값 처리 핸들러..
    const onInputChange = (e) =>{
        //setItem을 이용해서 처리한다
        setItem({title:e.target.value})//값가져오는 코드
        console.log(item);
        
    }

    return(
        <Grid container style={{marginTop:50, marginBottom:50}}>
            <Grid xs={10} md={10} item style={{paddingRight:16}}>
                <TextField
                    placeholder="Add Todo Here"
                    fullWidth
                    value={item.title}
                    onKeyDown={enterEventHandler}
                    onChange={onInputChange} 
                />
            </Grid>
            <Grid xs={2} md={2} item>
                <Button 
                    fullWidth style={{height:'100%'}} 
                    color ="success"
                    variant="outlined"//바깥선
                    onClick={onButtonClick}
                >
                (+)추가
                </Button>
            </Grid>
        </Grid>
    );


}
export default AddTodo;