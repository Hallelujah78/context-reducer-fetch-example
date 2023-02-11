import { usePictureContext, usePictureDispatchContext } from "./PictureContext";

const Pic = () => {
  const { pictures } = usePictureContext();
  const { setLoading, setError, setPictures } = usePictureDispatchContext();

  return (
    <div>
      <p>{pictures[0].download_url}</p>
    </div>
  );
};

export default Pic;
