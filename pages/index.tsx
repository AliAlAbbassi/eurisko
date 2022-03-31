import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AuthWrapper } from "../components/AuthWrapper";
import NavBar from "../components/NavBar";
import { selectisAuth } from "../redux/user/userSlice";

const DashboardScreen: NextPage = () => {
  const router = useRouter();
  const isAuth = useSelector(selectisAuth);
  if (!isAuth && typeof window !== "undefined") router.push("/login");

  // if (!isAuth) {
  //   return (
  //     <Box d={"flex"} justifyContent={"center"} alignItems={"center"}>
  //       <Spinner
  //         thickness="4px"
  //         speed="0.65s"
  //         emptyColor="gray.200"
  //         color="blue.500"
  //         size="xl"
  //       />
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <AuthWrapper />
      <NavBar />
      <Box>what???</Box>
    </Box>
  );
};

export default DashboardScreen;
