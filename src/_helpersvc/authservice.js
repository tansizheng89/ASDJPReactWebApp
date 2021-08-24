import axios from "axios";

//const API_URL = "http://54.89.175.168:8080/webapp/api/";
 const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(form) {
    return axios({
      method:"POST",
      url: API_URL + "login", 
      data: form, 
      headers: {"Content-Type": "multipart/form-data" }}
            );
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("image");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    window.location.href = '/';
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCurrentRole() {
    return localStorage.getItem('roles');
  }
}

export default new AuthService();