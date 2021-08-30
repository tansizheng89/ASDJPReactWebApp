import axios from "axios";

//For localhost connection
// const WEBUSERJOB_API_ROOT_URL = "http://localhost:8080/api";
// const WEBUSERJOB_API_BASE_URL = "http://localhost:8080/api/webuser/";

//For cloudhost connection
const WEBUSERJOB_API_ROOT_URL = "http://54.81.148.245:8080/webapp/api";
const WEBUSERJOB_API_BASE_URL = "http://54.81.148.245:8080/webapp/webuser/";

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


class DataService {
  getAllJobs() {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/list");
  }
  
  getUserUseRefreshToken(){

    processRefreshToken();
    
  }


  getJobsSearchCriteria(criteria) {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/list/search/"+criteria,token());
  }

  getJobDetail(jobid) {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/detail/"+jobid);
  }

  getJobIndustry(jobindustry) {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/list/categorize/"+jobindustry,token());
  }

  getFilterJob(jobtitle,jobrating,autismlevel) {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/list/filter/"+jobtitle+"/"+jobrating+"/"+autismlevel,token());
  }

  getJobCategory() {
    return axios.get(WEBUSERJOB_API_BASE_URL+"job/category");
  }

  saveBookmarkJob(jobid){
    return axios.get(WEBUSERJOB_API_BASE_URL+"bookmarkjob/"+jobid,token());
  }

  applyJobURL(jobid){
    return axios.get(WEBUSERJOB_API_BASE_URL+"applyjoburl/"+jobid,token());
  }

  applyJobEmail(jobid){
    return axios.get(WEBUSERJOB_API_BASE_URL+"applyjobemail/"+jobid,token());
  }

  getBookmarkJobsList() {
    return axios.get(WEBUSERJOB_API_BASE_URL+"bookmarkedjobs/list",token());
  }
  getViewedJobsList() {
    return axios.get(WEBUSERJOB_API_BASE_URL+"viewedjobs/list",token());
  }
}

export default new DataService();