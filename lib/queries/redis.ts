import axios from "axios";

export const userQuery = () => {
  return axios({
    method: "GET",
    baseURL: "http://localhost:3000",
    url: "/api/redis",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
