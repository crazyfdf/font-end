import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root.reduce";
import logger from "./middleware/logger";
import text from "./middleware/test";
import thunk from "./middleware/thunk";

export const store = createStore(rootReducer, applyMiddleware(logger, text, thunk));
