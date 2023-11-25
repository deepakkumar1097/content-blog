import React from "react";
import { useParams } from "react-router-dom";
import DeleteBlog from "../DeleteBlog/DeleteBlog";

export default function ReadBlog({ blog }) {
  const { blogId } = useParams();
  const blogs = blog.find((b) => b.id === parseInt(blogId, 10));
  //   const [blog, setBlog] = useState(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`/api/blogs/${blogId}`);
  //         const data = await response.json();
  //         setBlog(data);
  //       } catch (error) {
  //         console.error("Error fetching blog post:", error);
  //       }
  //     };
  //     fetchData();
  //   }, [blogId]);

  if (!blogs) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{blogs.title}</h1>
      <p>{blogs.content}</p>
      {/* ... other blog details ... */}
    </div>
  );
}
