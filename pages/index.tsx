import { Box, Flex, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { articlesQuery } from "../lib/queries/articles";
import { cacheDocs } from "../redux/articles/articlesSlice";
import { selectAccessToken, selectisAuth } from "../redux/user/userSlice";
import { useQuery } from "react-query";
import ArticleHome from "../components/ArticlesHome";

const DashboardScreen: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // auth route handling
  const isAuth = useSelector(selectisAuth);
  if (!isAuth && typeof window !== "undefined") router.push("/login");

  // page loading
  const [isPageLoading, setIsPageLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  });

  // fetch data
  const token = useSelector(selectAccessToken);
  const { data: articles } = useQuery(["articles", token, 1], articlesQuery, {
    onSuccess: (data) => {
      // cahce data in redux
      dispatch(
        cacheDocs({
          doc: data.data.response.docs[9],
          docs: data.data.response.docs,
        })
      );
    },
  });

  return (
    <Box>
      <NavBar />
      {isPageLoading ? (
        <Flex justifyContent={"center"} mt={"5"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : null}
      {articles ? (
        <ArticleHome
          doc={articles.data.response.docs[7]}
          docs={articles.data.response.docs}
        />
      ) : null}
    </Box>
  );
};

export default DashboardScreen;
