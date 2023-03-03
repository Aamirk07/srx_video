import styled from "styled-components";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  disLike,
  fetchFaliure,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/videoSlice";
import { subscripton } from "../redux/userSlice";
import Moment from "react-moment";
import Recomendation from "../components/Recomendation";

const Cotainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Content = styled.div`
  flex: 4;
`;

const VideoWrapper = styled.div``;
const Title = styled.h2`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  margin-top: 15px;
  margin-bottom: 5px;
`;

const VideoFrame = styled.video`
  max-height: 420px;
  width: 100%;
  object-fit: contain;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 15px;
`;
const Image = styled.img`
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  width: 35px;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ChannelName = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 700;
`;
const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  font-weight: 300;
`;
const Description = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  font-weight: 100;
`;
const Subscribe = styled.button`
  width: 100px;
  height: max-content;
  border: none;
  color: white;
  font-weight: 500;
  background-color: #cc1a00;
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(
          `http://localhost:8000/api/video/find/${path}`
        );
        dispatch(fetchSuccess(videoRes.data));
        const channelRes = await axios.get(
          `http://localhost:8000/api/user/find/${videoRes.data.userId}`
        );

        // setVideo(videoRes.data);
        setChannel(channelRes.data);
      } catch (err) {
        dispatch(fetchFaliure());
      }
    };

    fetchData();
  }, [path, dispatch]);

  const handelLike = () => {
    const fetchData = async () => {
      try {
        await axios.put(
          `http://localhost:8000/api/user/like/${currentVideo._id}`,
          {
            userId: currentUser._id,
          }
        );
        dispatch(like(currentUser._id));
      } catch (err) {}
    };
    fetchData();
  };

  const handelDislike = () => {
    const fetchData = async () => {
      try {
        await axios.put(
          `http://localhost:8000/api/user/dislike/${currentVideo._id}`,
          {
            userId: currentUser._id,
          }
        );
        dispatch(disLike(currentUser._id));
      } catch (err) {}
    };
    fetchData();
  };

  const handleSubscripton = async () => {
    {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`http://localhost:8000/api/user/unsub/${channel._id}`)
        : await axios.put(`http://localhost:8000/api/user/sub/${channel._id}`);
      dispatch(subscripton(channel._id));
    }
  };

  const [videos, setVideos] = useState();
  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get(`http://localhost:8000/api/video/trend`);
      setVideos(res.data);
    };
    getVideos();
  });

  return (
    <Cotainer>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views}views '{" "}
            <Moment fromNow>{currentVideo?.createdAt}</Moment>
          </Info>
          <Buttons>
            <Button onClick={handelLike}>
              {currentVideo?.likes?.includes(currentUser._id) ? (
                <i
                  style={{ color: "blue" }}
                  className="fa-solid fa-thumbs-up"
                />
              ) : (
                <i className="fa-solid fa-thumbs-up" />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handelDislike}>
              {currentVideo?.disLikes?.includes(currentUser._id) ? (
                <i
                  style={{ color: "tomato" }}
                  className="fa-solid fa-thumbs-down"
                />
              ) : (
                <i className="fa-solid fa-thumbs-down" />
              )}
              Dislie
            </Button>
            <Button>
              <i style={{ color: "#9e5c5c" }} className="fa-solid fa-share" />
              share
            </Button>
            <Button>
              <i className="fa-solid fa-ellipsis" />
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image
              src={
                channel.img
                  ? channel.img
                  : "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"
              }
            />
            <ChannelDetails>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSubscripton}>
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recomendation tags={currentVideo?.tags} />
    </Cotainer>
  );
};

export default Video;
