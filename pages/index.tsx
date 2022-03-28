import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const DashboardScreen: NextPage = () => {
  const isAuth = (): boolean => false;
  const router = useRouter();

  // if (!isAuth()) router.push("/login");

  return <div>yeet?</div>;
};

export default DashboardScreen;
