import { Box, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AuthWrapper } from "../components/AuthWrapper";
import { selectisAuth } from "../redux/user/userSlice";

const DashboardScreen: NextPage = () => {
  const router = useRouter();
  const isAuth = useSelector(selectisAuth);
  if (!isAuth && typeof window !== "undefined") router.push("/login");

  return (
    <Container>
      <AuthWrapper />
      <Box>what???</Box>
    </Container>
  );
};

export default DashboardScreen;
