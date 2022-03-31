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
