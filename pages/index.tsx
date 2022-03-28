import { Box, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { setAccessToken } from "../redux/user/userSlice";
import styles from "../styles/Home.module.css";

const DashboardScreen: NextPage = () => {
  const isAuth = (): boolean => false;
  const router = useRouter();

  // if (!isAuth()) router.push("/login");
  const token = useAppSelector((state) => state.user.access_token);
  return (
    <Container>
      <Box>what???</Box>
      <Box>{token}</Box>
    </Container>
  );
};

export default DashboardScreen;
