import { Box, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../components/ArticleList";
import NavBar from "../components/NavBar";
import { articlesQuery } from "../lib/queries/articles";
import { cacheDocs } from "../redux/articles/articlesSlice";
import { selectAccessToken } from "../redux/user/userSlice";

interface fakenewsProps {}

const FakeNews: NextPage<fakenewsProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);

  // page loaders and spinners
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  });

  // fetch data
  const { data: articles, isLoading } = useQuery(
    ["articles", token, 1],
    articlesQuery,
    {
      onSuccess: (data) => {
        // cahce data in redux
        dispatch(
          cacheDocs({
            doc: data.data.response.docs[9],
            docs: data.data.response.docs,
          })
        );
      },
    }
  );

  return (
    <>
      <NavBar />
      {isPageLoading || isLoading ? (
        <Box d={"flex"} justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : null}
      {articles ? <ArticleList docs={articles.data.response.docs} /> : null}
    </>
  );
};

export default FakeNews;
