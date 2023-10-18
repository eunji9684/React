//20523-10-12 4교시
//동적으로 사용자를 추가하는것을 해볼게요 추가하는것은 createUser.js 컴포넌트에서 작업해볼게여
//이 컴포는 App 으로 부터 전달된 사용자 정보와, 이벤트 핸들러 객체를 파라미터로
//받아서, 사용자의 정보를 수정, 생성 하는 기능을 갖도록 합니다.
const CreateUser = ({username,email,onChange,onCreate}) => {
    return(
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
             <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
        <button onClick={onCreate}>등록</button>
        </div>
    );

}
export default CreateUser;