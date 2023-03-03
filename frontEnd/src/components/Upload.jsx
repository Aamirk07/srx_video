import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000076;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: center; */
`;
const Title = styled.h2`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  outline: none;
  width: 95%;
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  outline: none;
  width: 95%;
`;

const Button = styled.button`
  width: 98%;
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: teal;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 12px;
`;

const Upload = ({ setOpen, userId }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [videoPer, setVideoPer] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handelChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(userId);
  const handelTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handelUpload = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPer(Math.round(progress))
          : setVideoPer(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && handelUpload(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && handelUpload(img, "imgUrl");
  }, [img]);

  const uploadData = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/video", {
      ...inputs,
      tags,
      userId: userId,
    });
    setOpen(false);
    res.status === 200 && navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <i
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            border: "2px solid gray",
            borderRadius: "50%",
            fontSize: "10px",
          }}
          className="fa-solid fa-xmark"
          onClick={() => setOpen(false)}
        />
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPer > 0 ? (
          "uploading:" + videoPer + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="title"
          name="title"
          onChange={handelChange}
        />
        <TextArea
          placeholder="description"
          rows={6}
          name="desc"
          onChange={handelChange}
        />
        <Input
          type="text"
          placeholder="seperate tags with commas."
          onChange={handelTags}
        />
        <Label>Image:</Label>
        {imgPer > 0 ? (
          "uploading:" + imgPer + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={uploadData}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
