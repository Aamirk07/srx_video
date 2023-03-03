import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Contanir = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  width: 35px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  padding: 5px;
  outline: none;
  width: 100%;
`;

const Button = styled.button`
  background-color: lightgray;
  border-style: none;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid teal;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [com, setCom] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/comments/${videoId}`
      );
      setComments(res.data);
    };
    fetchComments();
  }, [videoId]);

  const handelCom = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:8000/api/comments`, {
      videoId: videoId,
      comTxt: com,
      userId: currentUser._id,
    });
    window.location.reload(false);
  };


  return (
    <Contanir>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add comments"
          type="text"
          onChange={(e) => setCom(e.target.value)}
        />
        <Button onClick={handelCom}>
          <i
            style={{ color: "teal", fontSize: "17px" }}
            className="fa-solid fa-arrow-right"
          />
        </Button>
      </NewComment>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Contanir>
  );
};

export default Comments;
