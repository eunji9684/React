/*
2023-10-12-3교시
여기서는 배열에 담긴 객체를 가공하는 방법을 알아볼게요.
*/

//배열에 담겨있는 객체를 랜더링하는 함수를 하나 정의 할게요.
//이 함수는 내부에서만 사용이 목적이라면, export 하지 않으면 됩니다.
const User = ({user,onRemove,onToggle,onUpdate}) => {
    
 

    return(
        
        <div>
            <b
            style={{cursor : "pointer",color:user.active?'green':'red'}}
            onClick={()=>onToggle(user.id)}>
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
            <button onClick={()=> onUpdate(user.email)}>수정</button>
        </div>
    );
}
const UserList = ({users,onRemove,onToggle,onUpdate}) => {//원본데이터배열 app으로 넘겨줬으니 원본데이터를 받아와야한다.
   
    return(
        <div>
           {/* 렌더링 목적의 return 함수에서 로직을 구현할땐 반드시 중괄호로 묶어서 처리해야함. */}
           {//배열의 내장함수를 사용시엔 리턴되는 파라미터가 3rodla.
           //1.요소 2.요소의 index 3.배열 자체
            users.map((user)=>(
                <User user={user} key={user.id}  onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate}/>
                
            ))
           }
        </div>    
    );
   
}
export default UserList;