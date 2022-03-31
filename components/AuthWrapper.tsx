import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { userQuery } from "../lib/queries/redis";
import { authenticate, setAccessToken } from "../redux/user/userSlice";

interface AuthWrapperProps {}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({}) => {
  // authenticate from cache
  const dispatch = useDispatch();
  const { data } = useQuery("token", userQuery);

  if (data) {
    if (data.data != "") {
      console.log(data.data);
      dispatch(authenticate(true));
      dispatch(setAccessToken(data.data));
    }
  }

  return <></>;
};