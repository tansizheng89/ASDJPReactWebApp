import axios from "axios";

//for localhost connection
 const API_URL = "http://localhost:8080/api/";

 //for cloudhost connection
//  const API_URL = "http://:8080/api/";

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