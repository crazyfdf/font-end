import { handleActions as createReducer } from "redux-actions";
import { decrement, increment } from "../actions/counter.actions";

const initialState = {
  count: 0,
};
function handleIncrement(state, action) {
  return {
    count: state.count + action.payload,
  };
}
function handleDecrement(state, action) {
  return {
    count: state.count - action.payload,
  };
}
export default createReducer(
  {
    [increment]: handleIncrement,
    [decrement]: handleDecrement,
  },
  initialState
);
