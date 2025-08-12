const initialState = {
  message: "",
  type: "",
  show: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        show: true,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
