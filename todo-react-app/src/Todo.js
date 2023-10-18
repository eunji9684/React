import { Checkbox, IconButton, ListItem, ListItemSecondaryAction, ListItemText, InputBase} from "@mui/material";
import { useState } from "react";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"

//2023-10-12 6교시
const Todo = (props) =>{

    const[item,setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);
    const deleteItem = props.deleteItem;
    const editItem = props.editItem;

    const editEventHandler = (e) =>{
        setItem({...item, title: e.target.value});
    }
    
    //textbox 수정모드 변경
    const turnOnReadOnly = (e) =>{
        if(e.key === "Enter" && readOnly == false){
            setReadOnly(true);
            editItem(item);
           
        }
    }
    const checkBoxEventHandler = (e) =>{
        item.done = e.target.checked;
        //setItem({...item});
        editItem(item);
        
    }
    const deleteEventHandler =() =>{
        deleteItem(item);
    }
    const turnOffReadOnly = (e) =>{
        setReadOnly(false);
    }

    return(
            <ListItem>
                
                <Checkbox checked={item.done}
                onChange={checkBoxEventHandler}
                />
                {/* inputBase : MUI 에서 제공하는 input teg */}
                {/* ListItem 컨테이너는 하위에 구성될 item 들이 자식요소로 들어와야 하는데
                    이때 사용되는 형태에 따라서 ListItem을 중간 노드로 설정해야함...
                */}
                <ListItemText>
                    
                <InputBase 
                    inputProps={{
                        "aria-label" : "naked",
                        readOnly : readOnly,
                    }}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    //type 속성에 따라서 input 속성이 틀려짐
                    type = "text"
                    id={item.id}
                    name={item.name}
                    value={item.title || ""}
                    multiline={true}
                    fullWidth={true}
                />
                </ListItemText>
                {/* 위에 InputBase 옆에 icon 버튼을 하나 생성해서 붙일건데, 이때는
                    다시 중간 노드를 배치해야 붙일수 있습니다.
                 */}
                 <ListItemSecondaryAction>
                    <IconButton 
                    aria-label="Delete Todo"
                    onClick={deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                 </ListItemSecondaryAction>
            </ListItem>

    
    )
}
export default Todo;