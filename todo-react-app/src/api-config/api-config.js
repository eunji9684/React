//요청할 서버의 설정 정보를 정의하는 설정 파일
let backEndHost;

const hostname = window&&window.location&&window.location.hostname;

if(hostname === "localhost"){
    backEndHost = "http://localhost";
}

export const API_BASE_URL = `${backEndHost}`;