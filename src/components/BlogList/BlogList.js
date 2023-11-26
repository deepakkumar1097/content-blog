import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Avatar from "@mui/material/Avatar";

import DeleteButton from "../DeleteBlog/DeleteBlog";

import CreatedTime from "../../Services/CreatedTime";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../Redux/Slices/blogAction";

export default function BlogList({ blog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  console.log(blog);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));

    if (storedBlogs) {
      // Dispatch an action to update the Redux store with the loaded blogs
      storedBlogs.forEach((blog) => {
        dispatch(updateBlog(blog));
      });
    }
  }, [dispatch]);
  return (
    <div className="cards-container">
      <div className="blog-title">
        <Typography variant="h6">Content Blog Application</Typography>
        <Button variant="contained" onClick={() => navigate("/create")}>
          <AddBoxIcon /> Add New Blog
        </Button>
      </div>
      <div className="cards">
        {blogs.map((item, index) => {
          const truncatedContent =
            item.content.slice(0, 50) + (item.content.length > 50 ? "..." : "");
          return (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{
                  height: 140,
                  // backgroundPosition: "0px -80px",
                }}
                image={item.imageSrc}
                title="green iguana"
              />
              <CardContent>
                <Link
                  to={{
                    pathname: `/title/${item.id}`,
                  }}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  {truncatedContent}
                </Typography>
                <div>
                  <div className="author">
                    <Avatar
                      alt={item.author}
                      src={item.authorImg}
                      sx={{ backgroundPosition: "50% 100%" }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "12px", fontWeight: "300" }}
                    >
                      {item.author}
                    </Typography>
                  </div>
                  <Typography sx={{ fontSize: "12px", marginTop: "20px" }}>
                    Published {CreatedTime(item.createdAt)}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/edit/${item.id}`, {
                      state: {
                        blogData: blog.find(
                          (blogitem) => blogitem.id === item.id
                        ),
                      },
                    })
                  }
                >
                  <EditIcon sx={{ fontSize: "20px" }} />
                </Button>
                <Button size="small">
                  <ShareIcon sx={{ fontSize: "20px" }} />
                </Button>
                <DeleteButton blogId={item.id} />
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
