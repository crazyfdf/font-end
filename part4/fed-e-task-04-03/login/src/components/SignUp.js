import React, { useState } from "react";
import { InputGroup, Stack, InputLeftAddon, Button, Text } from "@chakra-ui/core";
import { FaUserAlt, FaLock, FaMobileAlt, FaVoicemail } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error";
export default function SignUp() {
  const user = { username: "", email: "", password: "" };
  const [errors, setError] = useState({});
  const handleSubmit = values => {
    axios
      .post("https://conduit.productionready.io/api/users", { user: values })
      .then(res => {
        if (res.status === 200) {
          alert("注册成功");
        }
      })
      .catch(err => {
        setError(err.response.data.errors);
      });
  };
  const schema = Yup.object({
    username: Yup.string().required("请输入用户名"),
    email: Yup.string().required("请输入邮箱地址"),
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
              name="username"
              placeholder="你的昵称"
            />
          </InputGroup>

          <div style={{ color: "red", fontSize: "14px" }}>
            <ErrorMessage name="username"></ErrorMessage>
          </div>
          <InputGroup>
            <InputLeftAddon children={<FaVoicemail />} />
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
              name="password"
              type="password"
              placeholder="设置密码"
            />
          </InputGroup>
          <div style={{ color: "red", fontSize: "14px" }}>
            <ErrorMessage name="password"></ErrorMessage>
          </div>
          <Text as="div" fontSize="12px">
            点击 “注册” 即表示您同意并愿意遵守简书
            <Text as="a" fontSize="12px" color="tomato">
              用户协议
            </Text>
            和
            <Text as="a" fontSize="12px" color="tomato">
              隐私政策
            </Text>
            。
          </Text>
          <Button
            type="submit"
            _hover={{ bgColor: "tomato" }}
            w="100%"
            h="40px"
            borderRadius="20px"
            colorScheme="green"
          >
            注册
          </Button>
          <Error errors={errors} />
        </Stack>
      </Form>
    </Formik>
  );
}
