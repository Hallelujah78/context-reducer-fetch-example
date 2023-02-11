import React, { useEffect, useCallback } from "react";
import { usePictureContext, usePictureDispatchContext } from "./PictureContext";

export const SinglePicture = () => {
  const { pictures } = usePictureContext();

  const { setPictures, setError, setLoading } = usePictureDispatchContext();

  const getData = useCallback(async () => {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=5"
    );
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      setPictures(data);
    } else {
      console.log(response.text, response.statusText);
      setError(true);
    }
    setLoading(false);
  }, [setPictures, setLoading, setError]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {pictures.map(({ download_url, author, id }) => (
        <img
          style={{ width: "100%" }}
          src={download_url}
          alt={author}
          key={id}
        />
      ))}
    </div>
  );
};
