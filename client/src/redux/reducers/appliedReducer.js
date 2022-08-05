const initialState = {
  app: [],
};

export const appliedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_APPLIED_JOBS":
      return {
        // We have to keep state constant and update jobs array
        ...state,
        app: action.payload,
      };
    default:
      return state;
  }
};
