const initState = {};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_STEP":
      return {
        ...state,
        activeStep: action.step
      };
    default:
      return state;
  }
};

export default rootReducer;
