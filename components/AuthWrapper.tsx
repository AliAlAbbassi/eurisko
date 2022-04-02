import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { userQuery } from "../lib/queries/redis";
import { authenticate, selectisAuth } from "../redux/user/userSlice";

interface AuthWrapperProps {}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  // authenticate from cache
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useQuery("token", userQuery);

  if (data) {
    if (data.data != "") {
      dispatch(authenticate({ isAuth: true, access_token: data.data }));
    }
  }

  return <>{children}</>;
};
