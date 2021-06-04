import { AuthUnionType, SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "../actions/auth.actions";

export interface AuthState {
  signUp: {
    loaded: boolean;
    success: boolean;
  };
}

const intialState: AuthState = {
  signUp: {
    loaded: false,
    success: false,
  },
};

export default function authReducer(state = intialState, action: AuthUnionType) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signUp: {
          loaded: false,
          success: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUp: {
          loaded: true,
          success: true,
        },
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signUp: {
          loaded: true,
          success: false,
          message: action.message,
        },
      };
  }
}
