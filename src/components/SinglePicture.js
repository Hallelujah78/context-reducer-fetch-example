import { Link } from "react-router-dom";

const SinglePicture = ({ author, id }) => {
  return (
    <div style={{ width: "20%", margin: "auto" }}>
      <img
        style={{ width: "100%" }}
        src={`https://picsum.photos/id/${id}/220`}
        alt={author}
      />
      <button style={{ width: "100%", margin: "0rem auto 1rem auto" }}>
        <Link to={`/${id}`}>View Image</Link>
      </button>
    </div>
  );
};

export default SinglePicture;
