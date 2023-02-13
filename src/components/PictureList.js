import React from "react";
import { useAppContext } from "../AppContext";
import SinglePicture from "./SinglePicture";

export const PictureList = () => {
  const { pictures } = useAppContext();

  return (
    <div>
      {pictures.map((picture) => {
        return <SinglePicture key={picture.id} {...picture} />;
      })}
    </div>
  );
};
