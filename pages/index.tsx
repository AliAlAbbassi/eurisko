import { Box, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../components/ArticleList";
import { AuthWrapper } from "../components/AuthWrapper";
import NavBar from "../components/NavBar";
import data from "../data.json";
import { articlesQuery } from "../lib/queries/articles";
import { cacheDocs } from "../redux/articles/articlesSlice";
import { selectAccessToken, selectisAuth } from "../redux/user/userSlice";

const DashboardScreen: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectisAuth);
  if (!isAuth && typeof window !== "undefined") router.push("/login");

  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  });

  // fetch data
  const token = useSelector(selectAccessToken);
  const { data: articles } = useQuery(["articles", token, 1], articlesQuery, {
    onSuccess: (data) => {
      console.log("articles", data);
    },
  });

  // cahce data in redux
  dispatch(cacheDocs({ doc: data.response.docs[7], docs: data.response.docs }));

  return (
    <Box>
      <AuthWrapper />
      <NavBar />
      {isPageLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : null}
      {articles ? <ArticleList doc={articles.data.response.docs[6]} /> : null}
    </Box>
  );
};

export default DashboardScreen;
