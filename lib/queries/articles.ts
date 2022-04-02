import axios from "axios";

export const articlesQuery = async ({ queryKey }: any) => {
  const [_, token, page] = queryKey;
  return await axios({
    method: "GET",
    baseURL: "http://localhost:3000",
    url: `/api/articles?page=${page}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
