import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../../Redux/Slices/blogAction";

import debounce from "../../Services/AutoSave";

export default function EditBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const blogData = location.state ? location.state.blogData : null;

  console.log("Location state:", location.state);
  console.log("Blog data:", blogData);

  const storedBlogData = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogData?.id)
  );

  console.log(storedBlogData);

  const [formData, setFormData] = useState({
    title: storedBlogData?.title || "",
    content: storedBlogData?.content || "",
    imageSrc: storedBlogData?.imageSrc || "",
    author: storedBlogData?.author || "",
    authorImg: storedBlogData?.authorImg || "",
  });
  const [autoSaveInProgress, setAutoSaveInProgress] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setAutoSaveInProgress(true);
  };

  const delayedSave = debounce(() => {
    // Implement your saving logic here
    console.log("Auto-saving:", formData);
    dispatch(
      updateBlog({
        id: blogData?.id,
        title: formData.title,
        content: formData.content,
        imageSrc: formData.imageSrc,
        author: formData.author,
        authorImg: formData.authorImg,
      })
    );

    setAutoSaveInProgress(false);
  }, 500);

  const handleGoBack = () => {
    // Save the changes before navigating back
    dispatch(
      updateBlog({
        id: blogData?.id,
        title: formData.title,
        content: formData.content,
        imageSrc: formData.imageSrc,
        author: formData.author,
        authorImg: formData.authorImg,
      })
    );

    // Clear auto-saved data
    localStorage.removeItem("autoSavedBlogData");
    // Navigate back to the BlogList
    navigate("/");
  };

  useEffect(() => {
    delayedSave();
    // Cleanup function to clear auto-saved data when unmounting
    return () => localStorage.removeItem("autoSavedBlogData");
  }, [formData, delayedSave]);

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
          Edit Blog
        </Typography>
      </FormLabel>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        sx={{ my: "10px" }}
      />

      <TextField
        variant="outlined"
        name="content"
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={4}
        value={formData.content}
        onChange={handleInputChange}
        minRows={4}
      />
      <TextField
        id="outlined-basic"
        label="Blog Image"
        variant="outlined"
        name="imageSrc"
        sx={{ my: "10px" }}
        value={formData.imageSrc}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-basic"
        label="Author Name"
        variant="outlined"
        name="author"
        sx={{ my: "10px" }}
        value={formData.author}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-basic"
        label="Author Image"
        variant="outlined"
        name="authorImg"
        sx={{ my: "10px" }}
        value={formData.authorImg}
        onChange={handleInputChange}
      />
      <div style={{ margin: "0 auto" }}>
        <Button variant="contained" sx={{ marginRight: "10px" }}>
          {autoSaveInProgress ? "Auto Saving..." : "Saved"}
        </Button>
        <Button onClick={handleGoBack} variant="contained">
          Go Back
        </Button>
      </div>
    </FormControl>
  );
}
