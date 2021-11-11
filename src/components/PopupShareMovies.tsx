import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Modal, Form, FormControl, Button } from "react-bootstrap";

const PopupShareMovies = () => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: Yup.object({
      url: Yup.string().required("Youtube URL is a required field"),
    }),
    onSubmit: (values) => {
      onShareYoutubeURL(values.url);
    },
  });

  const handleSubmit = () => formik.handleSubmit();

  const onShareYoutubeURL = async (url: string) => {
    try {
    } catch (err) {}
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
          <Button variant="primary" onClick={handleSubmit}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupShareMovies;
