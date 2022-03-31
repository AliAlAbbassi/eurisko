import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { userQuery } from "../lib/queries/redis";
import {
  authenticate,
  selectisAuth,
  setAccessToken,
} from "../redux/user/userSlice";

interface fakenewsProps {}

const FakeNews: NextPage<fakenewsProps> = ({}) => {
  const { data } = useQuery("token", userQuery);
  const dispatch = useDispatch();

  if (data) {
    if (data.data != "") {
      dispatch(authenticate(true));
      dispatch(setAccessToken(data.data));
    }
  }

  return (
    <>
      <NavBar />
      <>lotta fake news out there</>
    </>
  );
};

export default FakeNews;
