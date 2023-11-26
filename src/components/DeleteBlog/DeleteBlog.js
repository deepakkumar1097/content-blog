// DeleteButton.js

import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../Redux/Slices/blogAction";

const DeleteButton = ({ blogId }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const handleDelete = () => {
    // Dispatch the deleteBlog action with the blog ID
    dispatch(deleteBlog(blogId));

    // Update local storage after deleting the blog
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  return (
    <IconButton onClick={handleDelete} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
