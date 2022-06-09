import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:6060",
  headers: {
    "Content-Type": "application/json",
  },
});
