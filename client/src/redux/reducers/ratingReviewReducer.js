const initialState = {
  ratingreview: [],
};

export const ratingReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RATING_REVIEW":
      return {
        // We have to keep state constant and update jobs array
        ...state,
        ratingreview: action.payload,
      };
    default:
      return state;
  }
};
