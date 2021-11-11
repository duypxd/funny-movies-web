import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, FormControl, Spinner, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import signIn from "../redux/AuthRedux/signIn.operations";
import SignUp from "../redux/AuthRedux/SignUp.operations";
import getMe from "../redux/AuthRedux/getMe.operations";
import { actions } from "../redux/AuthRedux";

type TAuthState = "SignIn" | "SignUp";

export type TInitialValue = { email: string; password: string };

function HeaderAuth() {
  const dispatch = useDispatch();
  const { user, isSignIn } = useSelector((state: any) => state.auth);
  const [authType, setAuthType] = useState<TAuthState>("SignIn");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email must be a valid address")
        .required("Email is a required field")
        .lowercase(),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password can’t exceed 30 characters")
        .required("Password is a required field"),
    }),
    onSubmit: (values: TInitialValue) => {
      onRequestAuth(values);
    },
  });

  const onChangeField = (fieldName: string) => (e: any) => {
    formik.setFieldValue(fieldName, e.target.value);
  };

  const onSubmit = (type: TAuthState) => () => {
    setAuthType(type);
    formik.handleSubmit();
  };

  const onRequestAuth = async (values: TInitialValue) => {
    try {
      if (authType === "SignIn") {
        await dispatch(signIn(values));
      }
      if (authType === "SignUp") {
        await dispatch(SignUp(values));
      }
      formik.resetForm();
    } catch (err) {
      formik.resetForm();
    }
  };

  const getUserMe = async () => {
    try {
      await dispatch(getMe());
    } catch (err: any) {
      console.log("[GET_ME_ERROR]:", { ...err });
    }
  };

  useEffect(() => {
    getUserMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSignOut = () => {
    dispatch(actions.signOut());
    formik.resetForm();
  };

  if (isSignIn) {
    return <Spinner animation="border" variant="primary" />;
  }
  if (user && user?._id) {
    return (
      <Row className="align-items-center">
        <Col xs="auto">
          <span className="text-light bg-dark">Welcome {user?.email}</span>
        </Col>
        <Col xs="auto">{/* <ShareVideos /> */}</Col>
        <Col xs="auto">
          <Button type="button" onClick={onSignOut}>
            Logout
          </Button>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Form.Group as={Col}>
        <FormControl
          type="text"
          placeholder="Enter email"
          name="Email"
          value={formik.values.email}
          onChange={onChangeField("email")}
          className="mr-sm-2"
          isInvalid={formik.touched.email}
        />
        {formik.touched.email && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group as={Col}>
        <FormControl
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={onChangeField("password")}
          className=" mr-sm-2"
          isInvalid={formik.touched.password}
        />
        {formik.touched.password && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Col xs="auto">
        <Button onClick={onSubmit("SignIn")} color="dark">
          SignIn
        </Button>
      </Col>
      <Col xs="auto">
        <Button onClick={onSubmit("SignUp")} variant="outline-light">
          SignUp
        </Button>
      </Col>
    </Row>
  );
}

export default HeaderAuth;
