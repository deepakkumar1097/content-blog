const storedBlogs = JSON.parse(localStorage.getItem("blogs"));

const initialState = {
  blogs: storedBlogs || [],
};

const updateLocalStorage = (blogs) => {
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      const newBlogsAdd = [...state.blogs, action.payload];
      updateLocalStorage(newBlogsAdd);
      return { ...state, blogs: newBlogsAdd };

    case "UPDATE_BLOG":
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : blog
      );
      const newState = { ...state, blogs: updatedBlogs };
      updateLocalStorage(updatedBlogs);
      return newState;

    case "DELETE_BLOG":
      // ... handle delete and update local storage
      const updatedBlogsDelete = state.blogs.filter(
        (blog) => blog.id !== action.payload.blogId
      );
      updateLocalStorage(updatedBlogsDelete);
      return {
        ...state,
        blogs: updatedBlogsDelete,
      };

    default:
      return state;
  }
};

export default blogReducer;
