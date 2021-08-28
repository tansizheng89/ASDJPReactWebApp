import axios from "axios";

//For localhost connection
const WEBUSERJOB_API_ROOT_URL = "http://localhost:8080/api";
const WEBUSERJOB_API_BASE_URL = "http://localhost:8080/api/review/";

//For cloud connection
// const WEBUSERJOB_API_ROOT_URL = "http://:8080/api";
// const WEBUSERJOB_API_BASE_URL = "http://:8080/api/review/";

function token(){
  let accessToken = localStorage.getItem('userRefreshToken');
  return {
    headers:{Authorization:`Bearer ${accessToken}`,}
  };
}

function refreshToken(){
  let refreshToken = localStorage.getItem('userRefreshToken');
  return {headers:{Authorization:`Bearer ${refreshToken}`}};
}

function processRefreshToken(){
  axios.get(WEBUSERJOB_API_ROOT_URL+"/user/refreshtoken",refreshToken()).then(response=>{
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