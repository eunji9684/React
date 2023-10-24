//2023-10-12
//입력 컴포넌트의 value를 hook(state)을 이용해서 상태(state) 관리를 알아봅니다.


import { useState, useRef } from "react"; // useRef를 가져옵니다.


const InputSample = () => {
    /*
    3교시추가
    useRef() hook : DOM 내부에서 툭정 DOM 을 찾아낼때 사용되는 hook 입니다.
    ref는 당연히 reference 라는 이름이기 때문에 특정 DOM 객체를 참조한다는 의미 입니다.
    사용법은 변수 = useRef(), 컴포속성에 ref={} 변수명 이렇게 하면 됩니다.
    */
    //1교시
    //입력 컴포에 및 값 에 출력되는 상태 변수 선언 및 setter 선언합니다.
    //usestate 리턴은 배열로 돌려준다.
    //const[text,setText] = useState('');//text에 대한 초기값
  
    //하나 이상의 input 컴포의 상태 관리를 할떄는 useState 를 아래처럼 사용해서 관리합니다.
    //방법 : input 에 name 을 설정해서 이벤트가 발생시에 이 값을 참조해서 핸들링하면 편리합니다.
    //이 때 useState 는 문자열 형태가 아닌 객체 형태의 상태를 관리해야 합니다.(중요!!!!!!!!!!!!!!!!)

    const style={
        marginRight:"30px",
        marginBottom:"20px"
    }
    //이제 useState 를 사용해서 하위 input 객체를 관리하도록 객체선언과, setter 를 얻어냅니다.
    const[inputs,setInputs] = useState({
        name:'',
        nickname:''    
    });

    //inpusts 에 입력되는 값을 구조분해 할당을 통해 위 변수에 대입하도록 합니다.
    const {name,nickname} = inputs;

    //useRef() 를 사용해서 변수 초기화 합니다.
    const nameInput = useRef();//객체가 리턴된다.

    
   const onChange = (e) =>{
        const { name, value } = e.target;
        console.log(name,value);

        //값이 위에서 추출됨...(value(값),name(key))
        //이 값을 다시 inputs 내의 객체에 각각 할당해야합니다.
        setInputs({
            //제일중요!!!!객체를 대상으로 상태가 변경되었을때는, 반드시 원본객체를 보존하고(원본객체 불변법칙)
            //그것과 같은 객체를 생성, 그 객체의 상태를 바꿔줘야 합니다.
            //이렇게 해야만, virtual Dom은 두 객체를 비교, 변경된 내용을 파악후, 그 부분만 fetch 해서 DOM을 재구성합니다.
            //이렇게 재 구성된 DOM을 브라우저에 렌더링 하는거죠.

        ...inputs,//기존 inputs 객체를 복사합니다. 이렇게하면 원본객체는 그대로있고 복제된 inputs객체가 생성됩니다.
        [name]: value,//...inputs를 보면 [name]키가있을꺼야 이키에 value를 바꿔줘
        [nickname] : value
        })
    };

    const onReset = () => {
        setInputs({
            name : '',
            nickname : ''
        });
         //useRef()는 객체를 리턴하고 그 객체에는 여러 속성과 메서드가 있는데, focus()라는 메서드를 이용해서
        //focus를 두도록 할게요.
        nameInput.current.focus();
    };

        return(
        //하나의 컴포넌트에서는 하나의 루트 ele만 넘어가야된다.모든 조각들을 감싸는 큰 묶음이 있어야된다 <></>이것도가능
            <>
            <br/><br/>
            <input
             name='name'
             placeholder="이름"
             value={name}
             onChange={onChange} 
             style={style}
             ref={nameInput}
             />

            <input
            name='nickname'
            placeholder="닉네임"
            value={nickname}
            onChange={onChange}
            />

            <button onClick={onReset}>초기화</button>
            <div>
                <b style={{fontSize:"2rem"}}>값 : </b>
                {name}:({nickname})
            </div>
            </>
        
    );
}
export default InputSample;
