import React, { useEffect } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import getAllVideo from "../redux/VideoRedux/videos.operations";
import putVoteVideo from "../redux/VideoRedux/vote.operations";

import "../css/video.css";
import { TItemVideo } from "../api/video";
import MovieItem from "../components/MovieItem";

const Videos = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.video);
  const { user } = useSelector((state: any) => state.auth);

  const onLikeOrUnlike =
    (videoId?: string, isVote: boolean = false) =>
    async () => {
      try {
        await dispatch(putVoteVideo({ videoId, isVote }));
      } catch (err: any) {
        console.log("err", { ...err });
      }
    };

  useEffect(() => {
    dispatch(getAllVideo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center pt-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
  return (
    <Container className="d-flex pt-4">
      {data?.length > 0 ? (
        <Col xs={12}>
          {data?.map((item: TItemVideo, index: number) => (
            <MovieItem
              key={`index-${index}`}
              item={item}
              user={user}
              onLikeOrUnlike={onLikeOrUnlike}
            />
          ))}
        </Col>
      ) : (
        <Col xs={12} className="d-flex justify-content-center">
          <strong className="text-danger">{"No Movies!"}</strong>
        </Col>
      )}
    </Container>
  );
};

export default Videos;
