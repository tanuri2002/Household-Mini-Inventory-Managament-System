import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const signup = (userData) => {
  return axios.post(`${API_URL}/signup`, userData).then((response) => response.data);
};

const login = (credentials) => {
  return axios
    .post(`${API_URL}/login`, credentials)
    .then((response) => {
      if (response.data) {
        // localStorage.setItem("token", response.data);
         localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { signup, login, logout };