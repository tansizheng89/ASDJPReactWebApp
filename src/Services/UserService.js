import axios from "axios";

//const STUDENT_API_BASE_URL = "http://localhost:8080/api/webadmin";
const STUDENT_API_BASE_URL = "http://localhost:8080/api/user";

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

class StudentDataService {
  // getStudents() {
  //   return axios.get(STUDENT_API_BASE_URL+"/list",token());
  // }

  getUsers() {
    return axios.get(STUDENT_API_BASE_URL+"/userlist",token());
  }
  getUserUseRefreshToken(){

    processRefreshToken();
    
  }

  createUser(applicant) {
    return axios.post(STUDENT_API_BASE_URL+"/applicant/",applicant);
  }


  uploadAvatar(id, avatar){
    let file = new FormData();
    file.append("file", avatar);

    return axios.post(STUDENT_API_BASE_URL+"/applicant/updateavatar/"+id , file,{
      headers: {
        "Content-Type": "multipart/form-data",
      }},token());
  }

  uploadResume(id, resume){
    let formResume = new FormData();
    formResume.append("file", resume);

    return axios.post(STUDENT_API_BASE_URL+"/applicant/updateresume/"+id , formResume,{
      headers: {
        "Content-Type": "multipart/form-data",
      }},token());
  }
  getUserById(id) {
    return axios.get(STUDENT_API_BASE_URL+"/applicant/"+id,token());
  }
  // updateStudent(id, applicant) {
  //   return axios.post(STUDENT_API_BASE_URL+"/list/edit/"+id+"/", applicant, token());
  // }
  updateUser(id, applicant) {
    return axios.post(STUDENT_API_BASE_URL+"/applicant/", applicant, token());
  }
  deleteUser(id) {
    return axios.get(STUDENT_API_BASE_URL+"/user/"+id,token());
  }
  deleteAll() {
    return axios.delete(STUDENT_API_BASE_URL);
  }
  findByName(name) {
    return axios.get(STUDENT_API_BASE_URL+"?name="+name);
  }

  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post("http://localhost:8080/api/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    },token());
  }

  getFiles() {
    return axios.get("http://localhost:8080/api/file/files",token());
  }

  getAvatarFiles(id) {
    return axios.get("http://localhost:8080/api/user/applicant/avatarweb/"+id,token());
  }

}

export default new StudentDataService();
