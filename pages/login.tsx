import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginMutation } from "../lib/mutations/login";
import { userMutation } from "../lib/mutations/redis";
import { authenticate, selectisAuth } from "../redux/user/userSlice";

interface LoginWrapperProps {}

const login: NextPage<LoginWrapperProps> = ({}) => {
  return <LoginWrapper />;
};

interface LoginWrapperProps {}

export const LoginWrapper: React.FC<LoginWrapperProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuth = useSelector(selectisAuth);
  if (isAuth && typeof window !== "undefined") router.push("/");

  const { mutate: userMutate, isLoading: isUserLoading } = useMutation(
    userMutation,
    {
      onError: (error: string) => {
        console.log("redis server error", error);
      },
    }
  );

  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
    loginMutation,
    {
      onSuccess: (data) => {
        // caching in redux
        dispatch(
          authenticate({
            access_token: data.data.accessToken,
            isAuth: true,
          })
        );
        userMutate(data.data.accessToken);
        router.push("/");
      },
      onError: (error) => {
        console.log("login error", error);
      },
    }
  );

  const [isRouteChanging, setIsRouteChanging] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsRouteChanging(true));
    router.events.on("routeChangeComplete", () => setIsRouteChanging(false));
  });

  return (
    <Container
      h={"100vh"}
      display={"flex"}
      flexDir={"column"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text mb={10} fontWeight={"bold"} fontSize={"5xl"} textAlign={"center"}>
        HOOP News
      </Text>
      {isRouteChanging ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Box d={"flex"} justifyContent={"center"}>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, actions) => {
              loginMutate(values);
            }}
          >
            {(props) => (
              <Form>
                {/* {error.length !== 0 ? (
                  <FormErrorMessage>{error}</FormErrorMessage>
                ) : null} */}
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
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
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
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
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
        </Box>
      )}
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
