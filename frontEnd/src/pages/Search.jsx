import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const searchData = useLocation().search;
  const [video, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/video/search${searchData}`
      );
      setVideos(res.data);
    };
    fetchVideo();
  }, [searchData]);
  return (
    <Container>
      {video?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
