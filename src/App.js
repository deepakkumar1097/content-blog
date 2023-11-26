import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BlogList from "./components/BlogList/BlogList";
import EditBlog from "./components/EditBlog/EditBlog";
import ReadBlog from "./components/ReadBlog/ReadBlog";
import CreateBlog from "./components/CreateBlog/CreateBlog";

import { Provider, useDispatch, useSelector } from "react-redux";
import { updateBlog } from "./Redux/Slices/blogAction";
import store from "./Redux/store";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const initialData = JSON.parse(localStorage.getItem("blogs"));
  useEffect(() => {
    // Dispatch an action to update the Redux store with the initial data
    if (initialData) {
      initialData.forEach((blog) => {
        dispatch(updateBlog(blog));
      });
    }
  }, [dispatch]);
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<BlogList blog={blogs} />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route path="/title/:blogId" element={<ReadBlog />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
