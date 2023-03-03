import { Link } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => (props.type === "sm" ? "270px" : "260px")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex  "};
  gap: ${(props) => (props.type === "sm" ? "5px" : "10px")};
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "100px" : "160px")};
  background-color: #ccc;
  object-fit: cover;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "10px"};
  gap: ${(props) => (props.type === "sm" ? "2px" : "8px")};
  flex: 1;
`;
const ChannelImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;
const Title = styled.h2`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;
const ChannelName = styled.h3`
  font-size: 11px;
  color: ${({ theme }) => theme.textSoft};
  margin: 7px 0px;
`;
const Info = styled.div`
  font-size: 10px;
  color: #ccc;
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/user/find/${video.userId}`
      );
      setChannel(res.data);
      // console.log(res.data)
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImg type={type} src={channel.img} />
          <Texts type={type}>
            <Title type={type}>{video?.title}</Title>
            <ChannelName type={type}>{channel.username}</ChannelName>
            <Info type={type}>
              {video?.views} ' <Moment fromNow>{video.createdAt}</Moment>
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
