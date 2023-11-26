import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../Redux/Slices/blogAction";

import debounce from "../../Services/AutoSave";

export default function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [autoSaveInProgress, setAutoSaveInProgress] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    content: "",
    imageSrc: "",
    author: "",
    authorImg: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const delayedSave = debounce(() => {
    if (areAllFieldsFilled()) {
      dispatch(addBlog(formData));
      // Update local storage with the new blog data
      const newBlogs = [...blogs, formData];
      localStorage.setItem("blogs", JSON.stringify(newBlogs));
      setAutoSaveInProgress(false);
    }
  }, 1000); // Adjust the delay as needed

  useEffect(() => {
    const cleanup = delayedSave;

    return () => cleanup();
  }, [delayedSave]);

  const areAllFieldsFilled = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return (
    <FormControl
      style={{
        display: "flex",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <FormLabel>
        <Typography variant="h5" sx={{ fontWeight: 500, textAlign: "center" }}>
          Create New Blog
        </Typography>
      </FormLabel>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        type="text"
        name="title"
        sx={{ my: "10px" }}
        onChange={handleInputChange}
        value={formData.title}
      />

      <TextField
        variant="outlined"
        name="content"
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={4}
        minRows={4}
        onChange={handleInputChange}
        value={formData.content}
      />
      <TextField
        id="outlined-basic"
        label="Blog Image"
        variant="outlined"
        name="imageSrc"
        sx={{ my: "10px" }}
        onChange={handleInputChange}
        value={formData.imageSrc}
      />
      <TextField
        id="outlined-basic"
        label="Author Name"
        variant="outlined"
        name="author"
        sx={{ my: "10px" }}
        onChange={handleInputChange}
        value={formData.author}
      />
      <TextField
        id="outlined-basic"
        label="Author Image"
        variant="outlined"
        name="authorImg"
        sx={{ my: "10px" }}
        onChange={handleInputChange}
        value={formData.authorImg}
      />
      <div style={{ margin: "0 auto" }}>
        <Button variant="contained" sx={{ marginRight: "10px" }}>
          {autoSaveInProgress ? "Auto Saving..." : "Saved"}
        </Button>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    </FormControl>
  );
}
