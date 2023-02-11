const pictureReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PICTURES":
      return { ...state, pictures: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };

    default:
      return state;
  }
};

export default pictureReducer;
