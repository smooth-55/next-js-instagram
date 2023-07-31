import styled from "styled-components";
import { Post, RightBar, Stories } from "../components";
import PrivateRoute from "../withPrivateRoute";

const StyledHome = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const Home = () => {
  return (
    <StyledHome className="relative">
      <div>
        <Stories />
        <Post />
        <Post />
      </div>
      <RightBar />
    </StyledHome>
  );
}

export default PrivateRoute(Home);
