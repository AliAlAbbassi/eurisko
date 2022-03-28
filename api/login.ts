import axios from "axios";

interface loginMutationProps {
  username: string;
  password: string;
}

export const loginMutation = ({ username, password }: loginMutationProps) => {
  return axios({
    method: "post",
    baseURL: "http://localhost:3000",
    url: "/api/login",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      username,
      password,
    },
  });
};
