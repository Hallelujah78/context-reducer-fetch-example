import { useEffect } from "react";
import { usePictureDispatchContext } from "./PictureContext";

const useFetch = () => {
  const { setPictures, setLoading, setError } = usePictureDispatchContext();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=3"
      );
      if (response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        setPictures(data);
      } else {
        console.log(response.text, response.statusText);
        setError(true);
      }
    };
    getData();
  }, []);
};

export default useFetch;
