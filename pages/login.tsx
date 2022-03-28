import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { loginMutation } from "../api/login";
import { setAccessToken } from "../redux/user/userSlice";

interface LoginWrapperProps {}

const login: NextPage<LoginWrapperProps> = ({}) => {
  return <LoginWrapper />;
};

interface LoginWrapperProps {}

export const LoginWrapper: React.FC<LoginWrapperProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginApi = useMutation(loginMutation, {
    onSuccess: (data) => {
      // caching in redux
      dispatch(setAccessToken(data.data.accessToken));
      router.push("/");
    },
  });

  return (
    <Container
      h={"100vh"}
      display={"flex"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          loginApi.mutate(values);
        }}
      >
        {(props) => (
          <Form>
            <Field name="username" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                  mb={4}
                >
                  <FormLabel htmlFor="username" fontSize={20}>
                    Username
                  </FormLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="username"
                    fontSize={20}
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password" validate={validatePassword}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password" fontSize={20}>
                    Password
                  </FormLabel>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    fontSize={20}
                    type={"password"}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const validateName = (value: string) => {
  let error;
  if (!value) {
    error = "Name is required";
  }
  return error;
};

const validatePassword = (value: string) => {
  let error;
  if (value.length < 2) {
    error = "Passowrd should be atleast 3 characters";
  }
  return error;
};

export default login;
