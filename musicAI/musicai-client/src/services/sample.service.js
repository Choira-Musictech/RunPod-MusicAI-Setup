// import api from "./api";
import axios from "axios";
import { SAMPLE_SERVER_API } from '../config';
import TokenService from "./token.service";

const API_URL = SAMPLE_SERVER_API ||  "http://ai.choira.io/library/";

class SampleService {

  getSample = async (query) => {
    // console.log("Server API Auth serv", SERVER_API);
    const response = await axios
      .get(`${API_URL}query_sample/${query}`);
      // console.log("response", response);
    return response.data;
  }

  register(username, email, password) {
    return axios.post("register", {
      username,
      email,
      password
    });
  }
}

export default new SampleService();