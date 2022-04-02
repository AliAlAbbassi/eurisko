import { Box, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { selectisAuth } from "../redux/user/userSlice";

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

  // cahce data in redux

  return (
    <Box>
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
      {/* {articles ? <ArticleList doc={articles.data.response.docs[6]} /> : null} */}
    </Box>
  );
};

export default DashboardScreen;
