import { render, screen } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import Videos from "../Movies";

const useSelectorFake = jest.spyOn(ReactRedux, "useSelector");
const useDispatchFake = jest.spyOn(ReactRedux, "useDispatch");
const dispatchFake = jest.fn();

beforeEach(() => {
  useDispatchFake.mockReturnValue(dispatchFake);
});
test("should render share component", () => {
  useSelectorFake.mockReturnValue({
    user: { _id: "123", email: "xuanduyrn@gmail.com" },
    loading: false,
    data: [
      {
        _id: "",
        url: "",
        title: "",
        desc: "",
        videoId: "",
        authorShare: "",
        likes: 1,
        unLikes: 1,
        isLike: false,
        isUnLikes: false,
        updatedAt: "",
        createdAt: "",
      },
    ],
  });
  render(<Videos />);
});
