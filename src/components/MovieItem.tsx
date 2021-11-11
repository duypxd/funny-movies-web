import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import {
  BsHandThumbsDownFill,
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import { TItemVideo } from "../api/video";
import "../css/video.css";

interface IMovieItem {
  item: TItemVideo;
  user: any;
  onLikeOrUnlike: (videoId?: string, isVote?: boolean) => () => void;
}

const MovieItem = ({ item, user, onLikeOrUnlike }: IMovieItem) => {
  return (
    <Row className="mt-2 mb-5">
      <Col xs={6} className="d-flex justify-content-end">
        <iframe
          title={item._id}
          src={`https://www.youtube.com/embed/${item.videoId}`}
        ></iframe>
      </Col>
      <Col xs={6}>
        <strong className="text-danger">{item?.title}</strong>
        <div className="mt-2">
          <strong>Share by:</strong>
          <span className="p-2 text-danger">{item?.authorShare}</span>
          <span>
            <Button
              variant="light"
              disabled={!user}
              onClick={onLikeOrUnlike(item?._id, false)}
            >
              {!item.isUnLikes ? (
                <BsHandThumbsDown />
              ) : (
                <BsHandThumbsDownFill color="#0d6efd" />
              )}
              <span className="p-1">{item.unLikes || 0}</span>
            </Button>

            <Button
              variant="light"
              className="m-2"
              disabled={!user}
              onClick={onLikeOrUnlike(item?._id, true)}
            >
              {!item.isLike ? (
                <BsHandThumbsUp />
              ) : (
                <BsHandThumbsUpFill color="#0d6efd" />
              )}
              <span className="p-1">{item.likes || 0}</span>
            </Button>
          </span>
        </div>
        <div className="mt-2 text-dark text-desc">{item?.desc}</div>
      </Col>
    </Row>
  );
};

export default MovieItem;
