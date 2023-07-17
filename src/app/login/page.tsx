"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, FormGroup, Label, Input } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import useSWR from "swr";
import { useAppDispatch } from "@/redux/hooks";
import { userSignIn } from "@/redux/slices/user";
import { useRouter } from 'next/navigation'

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

// Validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 bg-white">
      <div>
        <h1 className="mb-4">Hello! Welcome back</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Send a POST request
              const response = await axios.post(
                "http://localhost:3001/auth/signin",
                values
              );
             dispatch(userSignIn(response.data));
             router.push("/admin");
            } catch (error) {
              console.error(error);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Field
                  as={Input}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  invalid={errors.username && touched.username}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  invalid={errors.password && touched.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>

              <Button type="submit" color="primary">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
