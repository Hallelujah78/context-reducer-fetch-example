import React from "react";
import { usePictureContext } from "./PictureContext";

export const PictureList = () => {
  const { pictures } = usePictureContext();

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
