import axios from "axios";

export let baseURL = `https://alter-backend-1.onrender.com/api/v1/`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
