import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as ReactRedux from "react-redux";
import * as Formik from "formik";
import ShareMovies from ".";

const useDispatchFake = jest.spyOn(ReactRedux, "useDispatch");
const useSelectorFake = jest.spyOn(ReactRedux, "useSelector");
const dispatchFake = jest.fn();
const useFormikFake = jest.spyOn(Formik, "useFormik");
const setFieldValueFake = jest.fn();
const handleChangeFake = jest.fn();
const resetFormFake = jest.fn();
const onsubmitFake = jest.fn();

beforeEach(() => {
  useDispatchFake.mockReturnValue(dispatchFake);
  useFormikFake.mockImplementation(({ onSubmit }: any) => {
    return {
      setFieldValue: setFieldValueFake,
      resetForm: resetFormFake,
      handleChange: handleChangeFake,
      handleSubmit: () => {
        onSubmit({ url: "https://www.youtube.com/watch?v=f3QmvxbzutQ" });
      },
      onsubmit: onsubmitFake,
      values: {
        url: "",
      },
      touched: {
        url: false,
      },
      errors: {
        url: "",
      },
    } as any;
  });
});
afterEach(() => {
  jest.clearAllMocks();
});

test("should render share component", () => {
  useSelectorFake.mockReturnValue({
    user: { _id: "123", email: "xuanduyrn@gmail.com" },
    isSignIn: false,
  });
  render(<ShareMovies />);
  const linkElement = screen.getByText("Share a movie");
  expect(linkElement).toBeInTheDocument();
});

test("should render login submit", async () => {
  useSelectorFake.mockReturnValue({
    user: {},
    isSignIn: false,
  });
  const dispatchMockPromise: any = () => Promise.resolve(true);
  useDispatchFake.mockReturnValue(dispatchMockPromise);

  const value1 = jest.fn().mockResolvedValue({ items: [{ snippet: {} }] });
  const value = Promise.resolve({ json: () => value1 });
  let globalRef: any = global;
  globalRef.fetch = jest.fn().mockResolvedValue(value);

  render(<ShareMovies />);
  fireEvent.click(screen.getByText("Share a movie"));

  const urlInput = screen.getByPlaceholderText("Enter youtube URL");
  expect(urlInput).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(screen.getByText("Share"));
  });
});

test("should closed modal", () => {
  useSelectorFake.mockReturnValue({
    user: { _id: "123", email: "xuanduyrn@gmail.com" },
    isSignIn: false,
  });
  const wrapper = render(<ShareMovies />);
  fireEvent.click(screen.getByText("Share a movie"));
  fireEvent.click(wrapper.baseElement.querySelector(".btn-close")!);
  // expect(screen.queryByText("Share a Youtube movie")).not.toBeInTheDocument();
});
