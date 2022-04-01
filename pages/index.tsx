import { Box, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleList from "../components/ArticleList";
import { AuthWrapper } from "../components/AuthWrapper";
import NavBar from "../components/NavBar";
import { selectisAuth } from "../redux/user/userSlice";
import data from "../data.json";

const DashboardScreen: NextPage = () => {
  const router = useRouter();
  const isAuth = useSelector(selectisAuth);
  if (!isAuth && typeof window !== "undefined") router.push("/login");

  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  });

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
      <ArticleList doc={data.response.docs[6]} />
    </Box>
  );
};

export default DashboardScreen;
