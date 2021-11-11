import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Modal, Form, FormControl, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_API_KEY } from "../utils/keyConfig";
import PostVideo from "../redux/VideoRedux/post.video.operations";
import { actions as actionListener } from "../redux/ListenerRedux";

const PopupShareMovies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { isShareMovie } = useSelector((state: any) => state.video);
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: Yup.object({
      url: Yup.string().url().required("Youtube URL is a required field"),
    }),
    onSubmit: (values) => {
      onShareYoutubeURL(values.url);
    },
  });

  const handleSubmit = () => formik.handleSubmit();

  const onShareYoutubeURL = async (url: string) => {
    try {
      const videoId = url.split("v=").pop();
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
      );
      const resJSON = await response.json();
      const mv = resJSON?.items[0]?.snippet;
      const payload = {
        url,
        authorShare: user?.email,
        videoId,
        title: mv.title,
        desc: mv.description,
      };
      await dispatch(PostVideo(payload));
      handleClose();
    } catch (err: any) {
      dispatch(
        actionListener.setMessageGlobal({
          status: "error",
          title: "Share movies error!",
          message: err?.message || "An unexpected error occurred.",
          isShow: true,
        })
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        Share a movie
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share a Youtube movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <FormControl
              type="text"
              placeholder="Enter youtube URL"
              name="Youtube URL"
              value={formik.values.url}
              onChange={formik.handleChange("url")}
              className="mr-sm-2"
              isInvalid={formik.touched.url}
            />
            {formik.touched.url && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.url}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isShareMovie}
          >
            {isShareMovie && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span className="p-2">Share</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupShareMovies;
