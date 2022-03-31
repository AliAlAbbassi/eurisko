import axios from "axios";

export const userMutation = (accessToken: string) => {
  return axios({
    method: "POST",
    baseURL: "http://localhost:3000",
    url: "/api/redis",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      accessToken,
    },
  });
};

export const logoutMutation = () => {
  return axios({
    method: "POST",
    baseURL: "http://localhost:3000",
    url: "/api/logout",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
