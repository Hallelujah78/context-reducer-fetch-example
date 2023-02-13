import { createContext } from "react";
import { useContext, useEffect, useReducer, useCallback } from "react";
import appReducer from "./appReducer";
import { URL } from "./utils";
export const AppContext = createContext(null);
export const AppDispatchContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const setPictures = useCallback((pictures) => {
    dispatch({
      type: "SET_PICTURES",
      payload: pictures,
    });
  }, []);

  const setSearch = useCallback((search) => {
    dispatch({
      type: "SET_SEARCH",
      payload: search,
    });
  });

  const getData = useCallback(async () => {
    const response = await fetch(URL);
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      console.log(data);
      setPictures(data);
      localStorage.setItem("pictures", JSON.stringify(data));
    } else {
      console.log(response.text, response.statusText);
    }
  }, [setPictures]);

  const [state, dispatch] = useReducer(appReducer, {
    pictures: !!localStorage.getItem("pictures")
      ? JSON.parse(localStorage.getItem("pictures"))
      : [],
    search: !!localStorage.getItem("search")
      ? JSON.parse(localStorage.getItem("search"))
      : "Google",
  });

  const { pictures, search } = state;

  useEffect(() => {
    if (pictures.length === 0) {
      getData();
    }
  }, [getData, pictures]);

  const value = { setPictures, setSearch };

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={value}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export const useAppDispatchContext = () => {
  const context = useContext(AppDispatchContext);
  return context;
};
