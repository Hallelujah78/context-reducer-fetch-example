import { createContext } from "react";
import { useContext, useReducer, useCallback } from "react";
import pictureReducer from "./pictureReducer";
export const PictureContext = createContext(null);
export const PictureDispatchContext = createContext(null);

const initialState = { pictures: [], loading: false, error: false };

// no reason pictureReducer shouldn't be defined in own file to facilitate reuse?
// export const pictureReducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case "SET_PICTURES":
//       return { ...state, pictures: payload };
//     case "SET_ERROR":
//       return { ...state, error: payload };
//     case "SET_LOADING":
//       return { ...state, loading: payload };

//     default:
//       return state;
//   }
// };

// this reducer just has a switch statement

export const PictureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pictureReducer, initialState);

  const setPictures = useCallback((pictures) => {
    dispatch({
      type: "SET_PICTURES",
      payload: pictures,
    });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({
      type: "SET_LOADING",
      payload: loading,
    });
  }, []);
  const setError = useCallback((error) => {
    dispatch({
      type: "SET_ERROR",
      payload: error,
    });
  }, []);

  // useEffect(() => {
  //   fetch("https://picsum.photos/v2/list?page=2&limit=3")
  //     .then((response) => response.json())
  //     .then((pictures) => {
  //       setPictures(pictures);
  //     });
  // }, []);

  const value = { setPictures, setLoading, setError };

  return (
    <PictureContext.Provider value={state}>
      <PictureDispatchContext.Provider value={value}>
        {children}
      </PictureDispatchContext.Provider>
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => {
  const context = useContext(PictureContext);
  return context;
};

export const usePictureDispatchContext = () => {
  const context = useContext(PictureDispatchContext);
  return context;
};
