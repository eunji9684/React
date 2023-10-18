//progs.children 속성 객체: 부모객체에서 자식 객체를 조회하고 싶을때 사용하는 속성.

import { Children } from "react";

//주로 태그 사이에 넣어진 값을 조회시 사용합니다.
// Wrapper.js 파일
const Wrapper = (props) => {
    const style = {
        border: '2px solid blue',
        padding: '20px'
    }

    return (
        <div style={style}>
            
            {props.children}
        </div>
    );
}


export default Wrapper;
