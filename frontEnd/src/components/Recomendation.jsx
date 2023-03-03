import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const RecomendationContainer = styled.div`
  flex: 1;
`;

const Recomendation = ({ tags }) => {
  const [videos, setVideos] = useState();

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/video/tags?tags=${tags}`
      );
      setVideos(res.data);
    };
    fetchVideo();
  });

  return (
    <RecomendationContainer>
      {videos?.map((video) => (
        <Card type="sm" video={video} key={video._id} />
      ))}
    </RecomendationContainer>
  );
};

export default Recomendation;
