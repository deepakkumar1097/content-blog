import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BlogList from "./components/BlogList/BlogList";
import EditBlog from "./components/EditBlog/EditBlog";
import ReadBlog from "./components/ReadBlog/ReadBlog";
import CreateBlog from "./components/CreateBlog/CreateBlog";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

const blog = [
  {
    id: 1,
    title: "Introduction to React",
    author: "John Doe",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    imageSrc:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D",
    authorImg:
      "https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072178.jpg",
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T14:30:00Z",
  },
  {
    id: 2,
    title: "CSS Tips and Tricks",
    author: "Jane Smith",
    content: "Nulla facilisi. Duis sodales justo nec elit semper...",
    imageSrc:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D",
    authorImg:
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=JSBpwVFm8vz23PZ44Rjn728NwmMtBa_DYL7qxrEWr38=",
    createdAt: "2023-02-05T09:45:00Z",
    updatedAt: "2023-02-05T11:20:00Z",
  },
  {
    id: 3,
    title: "Building RESTful APIs with Node.js",
    author: "Alex Johnson",
    content: "Aenean vel justo sit amet ligula sagittis lacinia...",
    imageSrc:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D",
    authorImg:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg",
    createdAt: "2023-03-12T18:15:00Z",
    updatedAt: "2023-03-12T20:00:00Z",
  },
];

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<BlogList blog={blog} />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:blogId" element={<EditBlog />} />
            <Route path="/title/:blogId" element={<ReadBlog blog={blog} />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
