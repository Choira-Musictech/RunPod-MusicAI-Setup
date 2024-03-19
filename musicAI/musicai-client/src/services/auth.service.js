// import api from "./api";
import axios from "axios";
import { SERVER_API } from '../config';
import TokenService from "./token.service";

const API_URL = SERVER_API ||  "http://ai.choira.io/server/v1/auth/";

class AuthService {

  login = async (email, password) => {
    // console.log("Server API Auth serv", SERVER_API);
    const response = await axios
      .post(`${API_URL}login`, {
        email,
        password
      });
    if (response.data.user) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return axios.post("register", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();