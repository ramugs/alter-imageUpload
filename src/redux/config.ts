import axios from "axios";

export let baseURL = `http://localhost/api/v1/`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
