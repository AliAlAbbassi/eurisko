import { Box, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

interface fakenewsProps {}

const FakeNews: NextPage<fakenewsProps> = ({}) => {
  // auth from cache

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
