import { createAction } from "redux-actions";
export const increment = createAction("increment");
export const decrement = createAction("decrement");

export const increment_async = () => dispatch => {
  setTimeout(() => {
    dispatch(increment());
  }, 2000);
};
