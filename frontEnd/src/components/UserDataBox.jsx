import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userSlice";

const DataBox = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.soft};
  width: 160px;
  height: 100px;
  top: 42px;
  right: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  font-size: 12px;
  padding: 10px;
  color: ${({ theme }) => theme.textSoft};
  /* position: relative; */
  z-index: 999;
`;
const Span = styled.span``;

const UserDataBox = ({ setDetails }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handeLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <DataBox className="change">
      <Span>
        <b>User : </b>
        {currentUser.username}
      </Span>
      <Span>
        <b>email :</b> {currentUser.email}
      </Span>
      <i
        style={{ fontSize: "13px", cursor: "pointer", color: "red" }}
        className="fas fa-sign-out"
      >
        <Span onClick={handeLogout}>logout</Span>
      </i>
      <i
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          cursor: "pointer",
        }}
        onClick={() => setDetails(false)}
        className="fa-solid fa-xmark"
      />
    </DataBox>
  );
};

export default UserDataBox;
