import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

function HeaderAuth() {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onChangeField = (fieldName: string) => (e: any) => {
    formik.setFieldValue(fieldName, e.target.value);
  };

  const onLogin = () => {};

  const onRegister = () => {};

  return (
    <Row>
      <Form.Group as={Col}>
        <FormControl
          type="text"
          placeholder="Enter email"
          name="Email"
          value={formik.values.email}
          onChange={onChangeField("email")}
          className=" mr-sm-2"
          isInvalid={formik.touched.email}
        />
        {formik.touched.email && (
          <Form.Control.Feedback type="invalid">
            {formik.touched.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group as={Col}>
        <FormControl
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={onChangeField("Password")}
          className=" mr-sm-2"
          isInvalid={formik.touched.password}
        />
        {formik.touched.password && (
          <Form.Control.Feedback type="invalid">
            {formik.touched.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Col xs="auto">
        <Button onClick={onLogin} color="dark">
          Login
        </Button>
      </Col>
      <Col xs="auto">
        <Button onClick={onRegister} variant="outline-light">
          Register
        </Button>
      </Col>
    </Row>
  );
}

export default HeaderAuth;
