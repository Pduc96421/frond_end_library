import { getCookie } from "~/helpers/cookie";

const initialState = {
  isLoggedIn: false,
  userData: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_LOGIN':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userData: action.payload.userData || state.userData
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;