import { useParams } from "react-router-dom";
import { useAppDispatchContext, useAppContext } from "../AppContext";

const PicturePage = () => {
  const { pictures } = useAppContext();
  const { id, author, download_url } = pictures;
  const { picID } = useParams();
  const { setPictures } = useAppDispatchContext();

  return (
    <section>
      <h2>Picture Page</h2>
      <img src={`https://picsum.photos/id/${picID}/1024`} alt={author} />
    </section>
  );
};

export default PicturePage;
