import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext, useAppDispatchContext } from "../AppContext";

const Navbar = () => {
  const { search } = useAppContext();
  const { setSearch } = useAppDispatchContext();

  const handleClick = () => {
    if (search === "Google") {
      setSearch("Bing");
    } else {
      setSearch("Google");
    }
  };

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      <Link style={{ marginLeft: "1rem" }} to="/">
        Home
      </Link>
      <Link style={{ marginLeft: "1rem" }} to="/about">
        About
      </Link>
      <Link style={{ marginLeft: "1rem" }} to="/contact">
        Contact
      </Link>
      <div className="state-container">
        {search}
        <button
          onClick={() => {
            handleClick();
          }}
          style={{ marginLeft: "1rem" }}
        >
          Switch
        </button>
      </div>
    </div>
  );
};

export default Navbar;
