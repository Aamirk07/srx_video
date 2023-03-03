import styled from "styled-components";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  width: 35px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 13px;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 11px;
  margin-left: 20px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: 100;
  font-size: 13px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/user/find/${comment.userId}`
      );
      setChannel(res.data);
    };
    fetchUser();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel?.username}
          <Date>
            {" "}
            <Moment fromNow>{comment?.createdAt}</Moment>
          </Date>
        </Name>
        <Text>{comment.comTxt}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
