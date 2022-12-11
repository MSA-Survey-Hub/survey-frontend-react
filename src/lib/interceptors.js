
import axios from "axios";
import apiConfig from "../lib/apiConfig";

//요청시 AccessToken 계속 보내주기
axios.interceptors.request.use(function (config) {

  let token = null;

  const user = localStorage.getItem("user");

  if (config.url != apiConfig.refreshToken) {
    token = JSON.parse(user).token.access_token;
  }

  if(token !== null){
    config.headers.Authorization = `Bearer ${token}`;
    // console.log("Authorization", config.headers.Authorization);

  }
  return config;

});

// axios로부터 response를 받아 처리하기 전에 intercept
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;

      if ( err.response.status === 401 &&err.config &&!err.config.__isRetryRequest ) {
        originalReq._retry = true;
      
        const user = localStorage.getItem("user");
        const ACCESS_TOKEN = JSON.parse(user).token.access_token;
        // console.log("원래 토큰", ACCESS_TOKEN);
        const REFRESH_TOKEN = JSON.parse(user).token.refresh_token;

         axios.post(apiConfig.refreshToken,{ refresh_token: REFRESH_TOKEN })
        .then((res) => {
            // 새로 받은 token들의 정보 저장
            localStorage.setItem('user', JSON.stringify(res.data));

            return axios(originalReq);

        }).catch(() => {
          // access token을 받아오지 못하는 오류 발생시 logout 처리
          localStorage.removeItem("user");
          window.location.href = "/"; 

          return false;
        });
      }
      // 오류 발생 시 오류 내용 출력 후 요청 거절
      return Promise.reject(err);
    });
  }
);

  