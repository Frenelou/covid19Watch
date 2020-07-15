// utils/API.js

import axios from "axios";

export default axios.create({
  baseURL: "https://covid19-api.org/api",
  responseType: "json"
});
