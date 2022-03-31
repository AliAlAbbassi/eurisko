import { Box, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import { userQuery } from "../lib/queries/redis";
import { authenticate } from "../redux/user/userSlice";

interface fakenewsProps {}

const FakeNews: NextPage<fakenewsProps> = ({}) => {
  // auth from cache
  const dispatch = useDispatch();
  const { data } = useQuery("token", userQuery);

  if (data) {
    if (data.data != "") {
      dispatch(authenticate({ isAuth: true, access_token: data.data }));
    }
  }

  // page loaders and spinners
  const router = useRouter();

  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  });

  return (
    <>
      <NavBar />
      {isPageLoading ? (
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
      <>lotta fake news out there</>
    </>
  );
};

export default FakeNews;
