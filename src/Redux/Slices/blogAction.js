import { v4 as uuidv4 } from "uuid";

export const updateBlog = (blogData) => {
  return {
    type: "UPDATE_BLOG",
    payload: {
      ...blogData,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const addBlog = (blogData) => {
  return {
    type: "ADD_BLOG",
    payload: {
      ...blogData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

export const deleteBlog = (blogId) => {
  return {
    type: "DELETE_BLOG",
    payload: {
      id: blogId,
    },
  };
};
