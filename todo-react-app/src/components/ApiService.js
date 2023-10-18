import { API_BASE_URL } from "../api-config/api-config";

export function call(api, method, request){
    

    //저장된 토큰을 get 해서 요청시마다 보냅니다.
    //이때 header정보에 토큰보낸다~ 라고 해야합니다.
    //때문에 header에 token 정보인 "Authoriazation 이라는 해더를 생성하고"
    //Authoriazation(인증) 방식으론 (Bearer) 로, 값은 토큰으로 보내도록 해더를 생성해야합니다.
    //그래야 서버에서 header 분석 후 토큰값을 가져다 인증을 할 수 있기 때문입니다.
    let headers = new Headers({
        "Content-Type" : "application/json",
    })
    //로컬스토리지에서 토큰 get 및 해더의 값으로 설정함
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken !== null){
        //headers 의 메서드를 통해 key:value 추가
        headers.append("Authorization", "Bearer " + accessToken);
    }


    let options = {
        //  headers: new Headers({
        //      "Content-Type" : "application/json"
        //  }),
        headers: headers,
        url:API_BASE_URL + api,
        method:method,
    };
    
    if(request){
        
        //Get 방식인 경우엔 body(클라이언트의 전송 데이터를 json 타입으로 변경)
        if (method !== "GET") {
            // JSON 형태의 데이터를 JSON 문자열로 변환
            options.body = JSON.stringify(request);
          }
    }

    return fetch(options.url, options)
    .then((response) => {
        //백단 서버의 요청 결과 코드에 따라서 리다이렉트 해준다
        if(response.status === 200){
            //post 요청으로 todo 항목 제대로 생선된 경우임.
            //결과 json 리턴함
            return response.json();
        }else if(response.status === 403){
            window.location= "/login";
        }else{
            throw new Error(response);
            console.log("에러 발생 : " , response);
        }
        // response.json().then((json) => {
        //     if(!response.ok){
        //         //서버 응답이 error 인 경우엔 reject 호출 후 서버 정보 리턴
        //         return Promise.reject(json);
        //     }
        //     return json;
        // })
    }
    ).catch((error) => {
        console.log("에러 발생함...",error)
    });
}

//로그인 폼에서 로그인(signin) 시 비동기로 서버에 요청을 보내는 함수 모듈 작성함
//signin 에서 토큰을 리턴 그 정보를 받아서 로그인에 활용
//스크립트에서는 모듈화라는 개념이 있는데, 이걸 선언하는 문법 export ~
//토큰정보를 받기 위해서는 username, password 를 Json 으로 보냄{}
//이 전송 json 은 Login UI 에서 이 함수를 호출시에 파람으로 전달합니다.
export async function signin(userDTO){
    const response = await call("/auth/signin", "POST", userDTO);
    if (response.token) {
        //console.log(response.token)
        //받은 토큰을 저장할게요
        localStorage.setItem("ACCESS_TOKEN", response.token);

        //토큰이 존재하면, 로그인 된거고, Todo 를 생성할 수 있습니다.
        //따라서 / 로 리다이렉션 시킵니다.
        window.location.href = "/";
        
    }
}
//로그아웃...localStorage를 비워줍니다.
export async function logout(){
   //localStorage.setItem("ACCESS_TOKEN",null);
   localStorage.removeItem("ACCESS_TOKEN");
   //localStorage.setitem(null);줘도된다.
    window.location.href="/login";
}