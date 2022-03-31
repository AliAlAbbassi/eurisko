import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { userQuery } from "../lib/queries/redis";
import { authenticate } from "../redux/user/userSlice";

interface AuthWrapperProps {}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({}) => {
  // authenticate from cache
  const dispatch = useDispatch();
  const { data } = useQuery("token", userQuery);

  if (data) {
    if (data.data != "") {
      dispatch(authenticate({ isAuth: true, access_token: "" }));
    }
  }

  return <></>;
};
