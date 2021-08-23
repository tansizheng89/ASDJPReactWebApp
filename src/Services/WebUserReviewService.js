import axios from "axios";

const WEBUSERJOB_API_BASE_URL = "http://localhost:8080/api/review/";

function token(){
  let accessToken = localStorage.getItem('user');
  return {
    headers:{Authorization:`Bearer ${accessToken}`,}
  };
}

function refreshToken(){
  let refreshToken = localStorage.getItem('userRefreshToken');
  return {headers:{Authorization:`Bearer ${refreshToken}`}};
}

function processRefreshToken(){
  axios.get("http://localhost:8080/api/user/refreshtoken",refreshToken()).then(response=>{
      localStorage.setItem("user", response.data.access_token);
      localStorage.setItem("userRefreshToken", response.data.refresh_token);
    });
}

class DataService1 {
  getReviewByJobandCompany(jobtitle,companyname) {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/company/"+jobtitle+"/"+companyname);
  }
  getUserUseRefreshToken(){

    processRefreshToken();
    
  }
}

export default new DataService1();