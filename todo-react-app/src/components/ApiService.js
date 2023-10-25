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
        if (response.status === 200) {
            if (method === "GET") {
                return response.text();
            } else {
                return response.json();
            }
        } else if (response.status === 403) {
            throw new Error("접근 권한이 없습니다.");
        } else if (response.status === 400) {
            throw new Error("잘못된 요청입니다.");
        } else {
            throw new Error("서버 응답 에러: " + response.status);
        }
    })
    .catch((error) => {
        console.log("에러 발생함...", error);
    });


}
//로그인 폼에서 로그인(signin) 시 비동기로 서버에 요청을 보내는 함수 모듈 작성함
//signin 에서 토큰을 리턴 그 정보를 받아서 로그인에 활용
//스크립트에서는 모듈화라는 개념이 있는데, 이걸 선언하는 문법 export ~
//토큰정보를 받기 위해서는 username, password 를 Json 으로 보냄{}
//이 전송 json 은 Login UI 에서 이 함수를 호출시에 파람으로 전달합니다.
export async function signin(userDTO, setIsLoggedIn, setName, setRole) {
    try {
        const response = await call("/auth/signin", "POST", userDTO);

        if (response && response.token) {
            // 받은 토큰을 저장합니다.
            localStorage.setItem("ACCESS_TOKEN", response.token);

            // 사용자 이름 가져오기
            const name = response.name;
            const role = response.role;
            localStorage.setItem("USER_NAME", name);
            localStorage.setItem("USER_ROLE", role);

            
           

            // 로그인 성공 시 리다이렉션합니다.
            alert(`${name}님 반갑습니다`);
            window.location.href = "/";
        } else {
            // 토큰이 없으면 로그인 실패한 것이므로 알림 창을 띄웁니다.
            alert("아이디 또는 패스워드가 올바르지 않습니다.");
            window.location.href = "/login";
        }
    } catch (error) {
        // 서버 요청에 실패하면 에러를 처리합니다.
        console.error("로그인 요청 실패:", error);
        // 에러 처리 로직을 추가할 수 있습니다.
        alert("로그인에 실패했습니다. 나중에 다시 시도하세요.");
    }
}

export async function signup(userDTO) {
  return call("/auth/signup","POST",userDTO,);
    
}

export async function checkEmail(email) {
    try {
        const response = await fetch(API_BASE_URL + "/auth/checkEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from checkEmail:", data);
            if (data && data.message === '중복된 이메일 주소입니다.') {
                return { isValid: false, message: data.message };
            } else if (data && data.message === '유효한 이메일 주소입니다.') {
                return { isValid: true, message: data.message };
            } else {
                return { isValid: false, message: '서버 에러가 발생했습니다.' };
            }
        } else {
            throw new Error(`서버 응답 에러: ${response.status}`);
        }
    } catch (error) {
        console.error("이메일 확인 중에 오류가 발생했습니다:", error);
        return { isValid: false, message: '서버 에러가 발생했습니다.' };
    }
}

export async function checkUsername(username) {
    try {
      const response = await fetch(API_BASE_URL + "/auth/checkUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      console.log('Server Response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Response from checkUsername:', data);

        if (data && data.message === '중복된 아이디입니다.') {
          return { isValid: false, message: data.message };
        } else if (data && data.message === '유효한 아이디입니다.') {
          return { isValid: true, message: data.message };
        } else {
          return { isValid: false, message: '서버 에러가 발생했습니다.' };
        }
      } else {
        throw new Error(`서버 응답 에러: ${response.status}`);
      }
    } catch (error) {
      console.error('서버 응답 처리 중 오류:', error);
      return { isValid: false, message: '서버 응답 처리 중 오류가 발생했습니다.' };
    }
}

// export async function fetchName(name) {
//     try {
//         const response = await fetch(`/auth/name?name=${name}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.status === 200) {
//             const data = await response.json();
//             return data.name;
//         } else if (response.status === 404) {
//             // 사용자를 찾을 수 없는 경우
//             return null;
//         } else {
//             // 다른 오류 처리
//             console.error('사용자 이름 가져오기 실패:', response.status);
//             return '';
//         }
//     } catch (error) {
//         console.error('사용자 이름 가져오기 실패:', error);
//         return '';
//     }
// }


  
//로그아웃...localStorage를 비워줍니다.
export async function logout(){
   //localStorage.setItem("ACCESS_TOKEN",null);
 
   localStorage.removeItem("ACCESS_TOKEN");
   localStorage.removeItem("USER_NAME");
    localStorage.removeItem("USER_ROLE");

   //localStorage.setitem(null);줘도된다.
    window.location.href="/login";
}