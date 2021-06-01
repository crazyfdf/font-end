import React, { useState } from "react";
import {
  InputGroup,
  Stack,
  InputLeftAddon,
  Switch,
  Button,
  Flex,
  FormLabel,
} from "@chakra-ui/core";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error";

export default function SignIn() {
  const user = JSON.parse(window.localStorage.getItem("user")) || { email: "", password: "" };
  const [isRemember, setIsRemember] = useState(true);
  const [errors, setError] = useState({});

  const handleSubmit = values => {
    axios
      .post("https://conduit.productionready.io/api/users/login", { user: values })
      .then(res => {
        if (res.status === 200) {
          if (isRemember) {
            window.localStorage.setItem("user", JSON.stringify(values));
          } else {
            window.localStorage.removeItem("user");
          }
          alert("登录成功");
        }
      })
      .catch(err => {
        setError(err.response.data.errors);
      });
  };
  const schema = Yup.object({
    email: Yup.string().required("请输入登录邮箱"),
    password: Yup.string().min(8, "密码长度要大于8位").required("请输入密码"),
  });
  return (
    <Formik onSubmit={handleSubmit} validationSchema={schema} initialValues={user}>
      <Form>
        <Stack spacing="4">
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt />} />
            <Field
              style={{ width: "100%", backgroundColor: "#eee" }}
              name="email"
              type="email"
              placeholder="邮箱"
            />
          </InputGroup>
          <div style={{ color: "red", fontSize: "14px" }}>
            <ErrorMessage name="email"></ErrorMessage>
          </div>
          <InputGroup>
            <InputLeftAddon children={<FaLock />} />
            <Field
              style={{ width: "100%", backgroundColor: "#eee" }}
              type="password"
              name="password"
              placeholder="密码"
            />
          </InputGroup>
          <div style={{ color: "red", fontSize: "14px" }}>
            <ErrorMessage name="password"></ErrorMessage>
          </div>
          <Flex>
            <Switch
              id="deal"
              mr="3"
              isChecked={isRemember}
              onChange={e => {
                setIsRemember(!isRemember);
              }}
            />
            <FormLabel htmlFor="deal">记住我</FormLabel>
          </Flex>
          <Button
            type="submit"
            h="40px"
            borderRadius="20px"
            colorScheme="blue"
            _hover={{ bgColor: "tomato" }}
            w="100%"
          >
            登录
          </Button>
          <Error errors={errors} />
        </Stack>
      </Form>
    </Formik>
  );
}
