import { HIDEMODAL, SHOWMODAL } from "../const/modal.const";

const initialState = {
  show: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOWMODAL:
      return {
        ...state,
        show: true,
      };
    case HIDEMODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
