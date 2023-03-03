// import { useState } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFaliure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  width: 22vw;
  align-items: center;
  border-radius: 5px;
  margin-top: 30px;
`;
const Headding = styled.h2`
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
`;

const HeaddingPara = styled.h3`
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  outline: none;
  background-color: transparent;
  padding: 5px;
  width: 70%;
  border: 1px solid ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  color: ${({ theme }) => theme.textSoft};
`;

const Btn = styled.button`
  padding: 5px 18px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0px;
  border: none;
  border-radius: 3px;
  background-color: #8f8c8c;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const fetchUser = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/auth/login", {
          email: email,
          password: password,
        });
        dispatch(loginSuccess(res.data));
        navigate("/");
      } catch (err) {
        dispatch(loginFaliure());
      }
    };
    fetchUser();
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await axios
          .post("http://localhost:8000/api/auth/google", {
            username: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
            console.log(res.data);
          });
      })
      .catch((error) => {
        dispatch(loginFaliure());
      });
  };

  const handelSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFaliure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Headding>Sign in</Headding>
        <HeaddingPara>to connect to Srx-Tv</HeaddingPara>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Btn onClick={handelLogin}>Sign in</Btn>
        <HeaddingPara>or</HeaddingPara>
        <Btn onClick={signInWithGoogle}>Signin with Google</Btn>
        <HeaddingPara>or</HeaddingPara>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Btn onClick={handelSignIn}>Sign up</Btn>
      </Wrapper>
    </Container>
  );
};

export default Login;
