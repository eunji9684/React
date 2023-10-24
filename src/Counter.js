//이 컴포는 버튼 두개를 생성해서 각 이벤트를 적용해서
//카운터를 증감 하도록 하는 컴포입니다.
//실제 증가하는 카운터 변수는 부모 컴포넌트에 존재하고, 이벤트도 부모에 존재 합니다.
//얘는 단지 UI 구성만 하고, 나머지는 props 를 통해 이벤트등의 초기 종버를 주고
//이벤트 이후 변경되는 상태 값은 state 이라는 내장 객체를 이용해서 가공합니다.
//대부분의 React 는 이러한 방식으로 구현되어 집니다.

/*
    Hooks : Hook은 React 에서 특정 기능을 수행하는 내장 함수들을 통틀어 말합니다.
    대표적으로 props,useState,useEffect...등 약 10 가지 내외(자주 사용되는 기준)
    이 hook 은 함수형 컴포넌트에서만 사용 가능하고, class 형 컴포넌트에서는 불가합니다(react 18 이상)
    리액트는 크게 컴포넌트와 컴포넌트디자인(css), hook을 이용한 컴포넌트간의 데이터 전송이 모두라고 봐도 좋음
    계속 hook 에 대해서 배워봅니다.
*/
import React, { useState } from "react";
const Counter = () => {

 //useState() (내장(inner) 인터페이스)내장함수객체 : 이 함수는 동적 데이터를 관리핟록 정의된 객체임.
//반드시 변환되는 값을 변수(주로 객체)는 이 함수를 이용해서 필요시 초기값을 할당 받고,
//setter 를 지정해서 이 setter 를 이용해서 값을 가공해야함.
//리턴값은 배열이다.[관리되야할 배열선언]

const [number, setNumber] = useState(0);//옵셔널 초기값을 줄수있따. (0)은 number에 대한 초기값 setNumber라는걸 세터로 사용해서 값변경을 하곘다.
const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
const colors = ["red","orange","yellow","green", "blue","Indigo","purple"];

    
//이벤트 객체를 정의 해서 버튼에 연결합니다.
const plus = () =>{
    setNumber(number + 1);
    setBackgroundColorIndex((backgroundColorIndex + 1) % colors.length);
    
}

const minus = () => {
    setNumber(number - 1);
    setBackgroundColorIndex((backgroundColorIndex + 1) % colors.length);
}
const backgroundColor = colors[backgroundColorIndex];
const width = "400px";
const height = "300px";
const margin = "0 auto";
const button={
    backgroundColor : "blue",
    color : "white",
    marginRight : "10px"
    
};
const buttonHoverStyle = {
    color : "#808080"

};


    return(
        <div style={{ backgroundColor,width,height,margin,display: "flex", justifyContent: "center", alignItems: "center",marginTop:"200px"}}>
           
            <h1 style={{marginRight:"30px" }}>{number}</h1>
            <button onClick={plus} style={button}>+1 증가</button>
            <button onClick={minus} className="button">-1 감소</button>
        </div>
    );
}
export default Counter;