import logo from './logo.svg';
import './App.css';//자바스크립트의 모듈화에 따른 문법. 각 모듈을 코드내로 import 시 사용.
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import { useRef, useState } from 'react';
import CreateUser from './CreateUser';



  //CreateUser 에 필요한 props 정보를 App 에서 준비해서 넘겨주도록 작업합니다.
  const App = () => {
    const [inputs, setInputs] = useState({
      username: '',
      email: ''
    });
  
    const { username, email } = inputs;
  //사용자의 정보를 변경시에 호출되는 이벤트 핸들러 정의 합니다.

  //사용자가 변경이 될때 원본배열을 보존해야 하고, 변경된(추가 or 수정) 사용자를 관리하는
  //신규 배열에 값을 조작해야 하기 때문에 상태관리자를 이용합니다.
const[users, setUsers] = useState([
  {
    id: 1,
    username: '황은지',
    email: 'dmswlwnsgk@naver.com',
    active :true

},
{
    id: 2,
    username: '김정우',
    email: 'wjddn@naver.com',
    active:false
},
{
    id: 3,
    username: '강정석',
    email: 'wjdtjr@naver.com',
    active:false
}
      
]);

  const onChange = (e) => {
    //변경된 내용을 받아오기.
    const {name,value} = e.target;

    setInputs({
      ...inputs,
      [name] : value
    
    });
  };


  /**
   * UserList.js에서 잘라서 가져오기
   * useRef() 의 또다른 기능 사용해보기... useRef의 기본 속성중에 current 를 이용해서 내부 변수를
   * 선언 및 관리 할 수 있습니다. 이 함수를 사용해서 생성된 변수는 상태(state) 과는 무관한 내부 변수이기
   * 때문에 이 값이 변경되어도 리렌더링이 되지 않습니다.(즉 내부용 이라는 의미),
   * 그렇기 때문에 이 값을 변경할떄는 useState 를 사용하지 않고 일반 연산을 통해 변경하면 됩니다.
   * 만약 이 값을 랜더링 대상으로 사용하고 싶을시엔, 랜더링 대상 값을 state 관리자를 통해 가공해주면 렌더링
   * 되어집니다.
   */
//값을 대입하기전까지는 렌더링대상이아니다.
const nextId = useRef(4);

//여기에는 신규 user 를 추가하는 이벤트 함수 객체를 정의 합니다.
const onCreate = () =>{

  //여기에는 신규 user 를 추가하는 이벤트 함수 객체를 정의 합니다.
  const user = {
    id:nextId.current,
    username,
    email
  }//이제 하나의 객체가 만들어졌습니다 배열에 대입해봅시다.

  //setUsers([...users,user]);//배열에 추가해줍니다 이제 렌더링 요소가 바꼈습니다 리렌더링이 자동으로 바뀝니다
  //currentid가 4에서 5로 바뀝니다.
  setUsers(users.concat(user));

  //신규 사용자 추가는 나중에 정의하고, 일단 inputs 의 상태값만 초기화 합니다.
  setInputs({
    username:'',
    email:''
  });

  //내부적으로 사용자의 index 를 관리하는 변수를 nextId를 이용합니다.
  //set,get 은 current 에 연산자를 이용 set, get은 속성명만 호출하면됨.
  nextId.current += 1;
}

//User 컴포넌트에서 id를 받아와서 해당 id값을 가진 배열 항목 삭제하기.
const onRemove = (id) => {//조건에 맞는애들만 리턴해주는 fillter
  setUsers(users.filter((user) => user.id !== id));//유저객체를받아서 user.id와 같지않은애들만 
  //신규배열만 리턴하니까 원본이랑 신규랑 비교해서 그애만 dom에서 리턴
};

//사용자의 이름을 활성/비활성으로 변경하는 onToggle 정의.
const onToggle = (id) =>{
  setUsers(users.map((user) =>(
    user.id === id? {...user,active: !user.active} :user
  )))
}
const onUpdate =(email , newEmail) => {
   setUsers(users.map((user) => {
     if(user.email === email){
       return{...user, email:newEmail }
     } 
       return user;
    
   }))
 }


  //지금 리액트는 JSX 문법을 사용하고 있기 때문에, HTML 의 style, css 를 내부에 정의시엔
  //문법이 틀립니다.
  //먼저 인라인 스타일은 반드시 객체 형태{}로 작성해야 합니다. 그리고 - or _ or 공백 등은
  //지원되지 않으며, 반드시 camel 표기법으로 해줘야 정상적으로 랜더링 됩니다.
  //ex>css : backgrond-color, jsx : backgroundColor

  //css class 를 설정시에도 다음 조건을 만족해야함.
  //노드에 class= 이 아니라, className = 이라는 속성으로 설정해야 합니다.

  //inline style 정의
  const style = {
    backgroundColor : 'yellow',
    color : 'orange',
    fontSize : 24,
    padding : '1rem'
  }

  //여기는 변수 선언, 로직 구현, 이벤트 객체 구현등을 정의 하는 영역..
  const name = '황은지';

  return (//여긴 순수하게 컴포넌트 랜더링만 하는 함수입니다.
  //로직을 구현할거면 return()외부에 정의 합니다.
    <div className="App">
      
       
      <InputSample></InputSample>
      {/* users={users}로 원본데이터 props해줘야한다. */}
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}></CreateUser>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate}></UserList> 
      {/* props를 이용해서 하위 컴포넌트에 (초기)값 전달 해볼게요. */}
     {/* <Hello name ="황은지" color ="brown" fontSize="30px"></Hello>
     <Hello  color ="pink" fontSize="50px"></Hello> */}
      <Counter>
      </Counter>
    
    </div>
  );
}


export default App; //이 컴포넌트가 타 컴포넌트에 호출되어 사용되려면 이전처럼 export default 함수명
//을 해줘야 모듈 컴포넌트가됨.
