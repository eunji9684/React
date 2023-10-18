import logo from './logo.svg';
import './App.css';//자바스크립트의 모듈화에 따른 문법. 각 모듈을 코드내로 import 시 사용.
import Hello from './Hello';

const App = () => {

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
      {/* JSX 문법 : Bavel 사의 문법으로 XML 형태이다. 
          외부 모듈을 이 문법을 이용해서 렌더링 컴포넌트로 선언하는 코드입니다.
          반드시 열리면 닫혀야 하고, 커플 Tag, SingleTag 모두 사용 가능합니다.
          각 모듈은 구성에 따라서 다양한 속성(객체, 이벤트 객체 등...)을 선언할수 있고,
          필요시 JSX 로 호출시 전달할수도 있따.(props, state 객체를 이용)
          */}
      {/* 하위의 노드를 하나의 덩어리로 묶을때 사용합니다. */}
      <>
      <Hello />
      <div style={style}>
        {name} 님.
      </div>
      <br/>
      <Hello />
      <Hello />
      <div className='pink-box'>
        <h2>이 내용은 App 에서 코딩한 내용임.</h2>
      </div>
      </>
    </div>
  );
}


export default App; //이 컴포넌트가 타 컴포넌트에 호출되어 사용되려면 이전처럼 export default 함수명
//을 해줘야 모듈 컴포넌트가됨.
