import { applyMiddleware, createStore } from "redux";
import { githubReducer } from "./github";
import thunk from "redux-thunk";

const store = createStore(
  githubReducer,
  applyMiddleware(thunk)
);

export { store };
