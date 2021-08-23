import axios from "axios";

const STUDENT_API_BASE_URL = "http://localhost:8080/api/webadmin";

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

class DataService {
  getApplicants() {
    return axios.get(STUDENT_API_BASE_URL+"/list/applicant",token());
  }
  getUserUseRefreshToken(){

    processRefreshToken();
    
  }
  getApprovedApplicants() {
    return axios.get(STUDENT_API_BASE_URL+"/list/applicant/approve",token());
  }
  getBlockedApplicants() {
    return axios.get(STUDENT_API_BASE_URL+"/list/applicant/block",token());
  }
  updateApplicant(id, reviewStatus) {
    return axios.get(STUDENT_API_BASE_URL+"/list/applicant/"+id+"/"+reviewStatus,token());
  }
  getReviews() {
    return axios.get(STUDENT_API_BASE_URL+"/list/reviews/rejected",token());
  }
  getApprovedReviews() {
    return axios.get(STUDENT_API_BASE_URL+"/list/reviews/approved",token());
  }
  getBlockedReviews() {
    return axios.get(STUDENT_API_BASE_URL+"/list/reviews/rejected",token());
  }
  updateReview(id, reviewStatus) {
    return axios.get(STUDENT_API_BASE_URL+"/list/reviews/"+id+"/"+reviewStatus,token());
  }
}

export default new DataService();
