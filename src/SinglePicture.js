import React, { useEffect, useCallback } from "react";
import { usePictureContext, usePictureDispatchContext } from "./PictureContext";

export const SinglePicture = () => {
  const { pictures } = usePictureContext();

  const { setPictures, setError, setLoading } = usePictureDispatchContext();

  // this works:
  // useEffect(() => {
  //   fetch("https://picsum.photos/v2/list?page=2&limit=3")
  //     .then((response) => response.json())
  //     .then((pictures) => {
  //       setPictures(pictures);
  //     });
  // }, [setPictures]);

  const getData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=1"
    );
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      setPictures(data);
      setLoading(false);
    } else {
      console.log(response.text, response.statusText);
      setError(true);
    }
  }, [setPictures, setLoading, setError]);

  useEffect(() => {
    getData();
  }, [getData]);

  // PictureList is working
  // test to see if setPictures is accessible here
  // this is working - if you set value to an array in the context, make sure you destructure an array.
  // works if value's type in context (array or object) matches the destructuring type

  return (
    <div>
      {pictures.map((picture) => (
        <img
          style={{ width: "100%" }}
          src={picture.download_url}
          alt={picture.author}
          key={picture.id}
        />
      ))}
    </div>
  );
};
