//Hello Component 구성함.
//클래스와 function 두개다 사용 가능하지만, 리엑트 18 이후부터는
//중요한 데이터 교환 수단인 hooks 라는 객체를 class 형태에서는 사용불가합니다.
//때문에 function 형태로 구현한다라고 생각하세요.

//React 를 상속받기 위해 React import.
import React from "react";

const Hello = ({name,color,fontSize,isSpecial}) => {
    //랜더링할 내용 정의 함수 return();
    //반드시 이 내부에 컴포넌트를 정의 해야만 렌더링이 됩니다.
   return(
     <div 
     style={{color,fontSize}}>
        {isSpecial?<b>**</b>:null}
     안녕하세요!!!{name} 님...</div>
   );
}

//default props : props 로 넘어오지 않는 파라미터가 존재하는 경우 기본값을 세팅하거나
//또는 파라미터와 상관없이 특정 속성의 기본값을 초기화 하는 기본 props
//컴포넌트이름.defaultProps = {}
Hello.defaultProps={
    name: '아무개'
};

export default Hello;//모듈화 선언
