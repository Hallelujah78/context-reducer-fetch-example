import { createContext } from "react";
import { useContext, useReducer, useCallback } from "react";
import pictureReducer from "./pictureReducer";
export const PictureContext = createContext(null);
export const PictureDispatchContext = createContext(null);

export const PictureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pictureReducer, {
    pictures: [],
    loading: true,
    error: false,
  });

  const { pictures, loading, error } = state;

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
