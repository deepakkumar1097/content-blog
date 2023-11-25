import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";

import CreatedTime from "../../Services/CreatedTime";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BlogList({ blog }) {
  const navigate = useNavigate();

  const handleEditClick = () => {};
  return (
    <div className="cards-container">
      <div className="blog-title">
        <Typography variant="h4" gutterBottom>
          Blog
        </Typography>
      </div>
      <div className="cards">
        {blog.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{
                  height: 140,
                  backgroundPosition: "0px -80px",
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
                  {item.content}
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
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
