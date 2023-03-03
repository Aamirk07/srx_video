// import { useState } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import UserDataBox from "./UserDataBox";
import Upload from "./Upload";
import UserDataBox from "./UserDataBox";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const LoginBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border-style: none;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  border-radius: 3px;
`;

const User = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const Avatar = styled.img`
  height: 35px;
  width: 35px;
  object-fit: cover;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [q, setQ] = useState("");

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setQ(e.target.value);
              }}
            />
            <i
              style={{ fontSize: "13px", color: "#ccc" }}
              className="fas fa-search"
              onClick={() => {
                navigate(`/search?q=${q}`);
              }}
            />
          </Search>
          {currentUser ? (
            <>
              <User>
                <i
                  className="fas fa-plus"
                  onClick={() => setOpen(true)}
                  style={{
                    fontSize: "15px",
                    color: "#ccc",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgray",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                <Avatar
                  src={currentUser.img}
                  onClick={() => setDetails(true)}
                />
                {/* <i
                  style={{ fontSize: "16px", cursor: "pointer", color: "red" }}
                  className="fas fa-sign-out"
                  onClick={handelLogout}
                /> */}
              </User>
            </>
          ) : (
            <Link style={{ textDecoration: "none" }} to="login">
              <LoginBtn>
                <i
                  style={{ fontSize: "13px" }}
                  className="fas fa-user-circle"
                />
                SIGN IN
              </LoginBtn>
            </Link>
          )}
        </Wrapper>
      </Container>
      {details && <UserDataBox setDetails={setDetails} />}
      {open && <Upload setOpen={setOpen} userId={currentUser._id} />}
    </>
  );
};

export default Navbar;
