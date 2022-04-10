const initialState = {
  jobs: [],
};

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_JOBS":
      return {
        // We have to keep state constant and update jobs array
        ...state,
        jobs: action.payload,
      };
    default:
      return state;
  }
};
