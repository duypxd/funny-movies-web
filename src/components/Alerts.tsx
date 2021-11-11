import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/ListenerRedux";

const Alerts = () => {
  const dispatch = useDispatch();
  const { isShow, status, title, message } = useSelector(
    (state: any) => state.listener
  );
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(actions.setMessageGlobal({ isShow: false }));
  };

  useEffect(() => {
    if (isShow) {
      setShow(true);
    }
    return () => {};
  }, [isShow]);

  const getClassName = () => {
    switch (status) {
      case "success":
        return "text-success";
      case "error":
        return "text-danger";
      default:
        return "text-warning";
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={getClassName()}>{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </>
  );
};

export default Alerts;
