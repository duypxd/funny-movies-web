import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as ReactRedux from "react-redux";
import * as Formik from "formik";
import LoginForm from ".";

jest.mock("../ShareMovies", () => {
  return {
    __esModule: true,
    default: () => <div>ShareMovies</div>,
  };
});

const useDispatchFake = jest.spyOn(ReactRedux, "useDispatch");
const useSelectorFake = jest.spyOn(ReactRedux, "useSelector");
const dispatchFake = jest.fn();
const useFormikFake = jest.spyOn(Formik, "useFormik");
const setFieldValueFake = jest.fn();
const resetFormFake = jest.fn();
const handleSubmitFake = jest.fn();
const onsubmitFake = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  useDispatchFake.mockReturnValue(dispatchFake);
  useFormikFake.mockImplementation(({ onSubmit }: any) => {
    return {
      setFieldValue: setFieldValueFake,
      resetForm: resetFormFake,
      handleSubmit: () => {
        onSubmit({ email: "xuanduyrn@gmail.com", password: "12345678" });
      },
      onsubmit: onsubmitFake,
      values: {
        email: "",
        password: "",
      },
      touched: {
        email: false,
        password: false,
      },
      errors: {
        email: "",
        password: "",
      },
    } as any;
  });
});

test("should render login component", () => {
  useSelectorFake.mockReturnValue({
    user: { _id: "123", email: "xuanduyrn@gmail.com" },
    isSignIn: false,
  });
  render(<LoginForm />);
  const linkElement = screen.getByText("Welcome xuanduyrn@gmail.com");
  expect(linkElement).toBeInTheDocument();
});

test("should render login submit", async () => {
  useSelectorFake.mockReturnValue({
    user: {},
    isSignIn: false,
  });

  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText("Enter email");
  const passwordInput = screen.getByPlaceholderText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  await act(async () => {
    fireEvent.change(emailInput, {
      target: { value: "xuanduyrn@gmail.com" },
    });
  });
  expect(setFieldValueFake).toBeCalledWith("email", "xuanduyrn@gmail.com");
  await act(async () => {
    fireEvent.change(passwordInput, {
      target: { value: "12345678" },
    });
  });
  expect(setFieldValueFake).toBeCalledWith("password", "12345678");

  fireEvent.click(screen.getByText("SignIn"));
  // expect(handleSubmitMock).toBeCalled();
});

test("should render sign up submit", async () => {
  useSelectorFake.mockReturnValue({
    user: {},
    isSignIn: false,
  });

  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText("Enter email");
  const passwordInput = screen.getByPlaceholderText("Password");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  await act(async () => {
    fireEvent.change(emailInput, {
      target: { value: "xuanduyrn@gmail.com" },
    });
  });
  expect(setFieldValueFake).toBeCalledWith("email", "xuanduyrn@gmail.com");
  await act(async () => {
    fireEvent.change(passwordInput, {
      target: { value: "12345678" },
    });
  });
  expect(setFieldValueFake).toBeCalledWith("password", "12345678");

  await act(async () => {
    fireEvent.click(screen.getByText("SignUp"));
  });
  // expect(handleSubmitMock).toBeCalled();
});

test("should render signout", async () => {
  useSelectorFake.mockReturnValue({
    user: {
      _id: "123",
      email: "xuanduyrn@gmail.com",
    },
    isSignIn: false,
  });
  useFormikFake.mockImplementation(() => {
    return {
      resetForm: resetFormFake,
    } as any;
  });
  render(<LoginForm />);
  const linkElement = screen.getByText("Welcome xuanduyrn@gmail.com");
  expect(linkElement).toBeInTheDocument();
  useDispatchFake.mockReturnValue(jest.fn());
  await act(async () => {
    fireEvent.click(screen.getByText("Logout"));
  });
});

test("should render loading", async () => {
  useSelectorFake.mockReturnValue({
    isSignIn: true,
  });
  render(<LoginForm />);
});
