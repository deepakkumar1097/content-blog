import { createStore } from "redux";
import blogReducer from "./Reducer/blogReducer";

const store = createStore(blogReducer);

export default store;
