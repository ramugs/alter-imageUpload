import axios from "axios";

export let baseURL = `http://localhost:5000/api/v1/`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
