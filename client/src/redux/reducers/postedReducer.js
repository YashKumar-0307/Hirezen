const initialState = {
    posted: [],
  };
  
  export const postedReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_POSTED_JOBS":
        return {
          // We have to keep state constant and update jobs array
          ...state,
          app: action.payload,
        };
      default:
        return state;
    }
  };