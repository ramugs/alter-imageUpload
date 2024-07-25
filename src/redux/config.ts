import axios from "axios";

export let baseURL = `https://alter-backend-w7ay.onrender.com/api/v1/`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
