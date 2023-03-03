import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1.3;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100%;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;
const Icon = styled.i`
  font-size: 23px;
  color: tomato;
`;
const LogoTxt = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  font-size: 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
`;
const ItemIcons = styled.i`
  font-size: 13px;
`;
const ItemSpan = styled.h1`
  font-size: 11px;
  font-weight: 300;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  font-size: 11.5px;
  display: flex;
  flex-direction: column;
`;
const LoginBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border-style: none;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  border-radius: 3px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Link style={{ textDecoration: "none" }} to="/">
          <Logo>
            <Icon className="fa-brands fa-youtube" />
            <LogoTxt>SRX-Tv</LogoTxt>
          </Logo>
        </Link>
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          <Item>
            <ItemIcons className="fa-solid fa-house" />
            <ItemSpan>Home</ItemSpan>
          </Item>
        </Link>
        <Link style={{ textDecoration: "none", color: "inherit" }} to="trends">
          <Item>
            <ItemIcons className="fa-solid fa-compass" />
            <ItemSpan>Explore</ItemSpan>
          </Item>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="subscriptions"
        >
          <Item>
            <ItemIcons className="fas fa-plus-circle" />
            <ItemSpan>Subscription</ItemSpan>
          </Item>
        </Link>
        <Hr />
        <Item>
          <ItemIcons className="fas fa-record-vinyl" />
          <ItemSpan>Library</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-history" />
          <ItemSpan>History</ItemSpan>
        </Item>
        <Hr />
        {!currentUser && (
          <Login>
            Sign in to like videos,comment and subscribe.
            <LoginBtn>
              <i style={{ fontSize: "14px" }} className="fas fa-user-circle" />
              SIGN IN
            </LoginBtn>
          </Login>
        )}
        {!currentUser && <Hr />}
        <Title>BEST OF SRX-TV</Title>
        <Item>
          <ItemIcons className="fas fa-music" />
          <ItemSpan>Music</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-volleyball-ball" />
          <ItemSpan>Sport</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-gamepad" />
          <ItemSpan>Gaming</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-video" />
          <ItemSpan>Movies</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-newspaper" />
          <ItemSpan>News</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-tv" />
          <ItemSpan>Live</ItemSpan>
        </Item>
        <Hr />
        <Item>
          <ItemIcons className="fas fa-wrench" />
          <ItemSpan>Settins</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-flag" />
          <ItemSpan>Report</ItemSpan>
        </Item>
        <Item>
          <ItemIcons className="fas fa-question-circle" />
          <ItemSpan>Help</ItemSpan>
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <ItemIcons className="fas fa-sun" />
          <ItemSpan>Light Mode</ItemSpan>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
