import React from "react";
import { Link, Contacts } from "./Home.styled";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="tweets" state={{ from: location }}>
        Your bloggers are here.
      </Link>
      <p style={{ marginTop: "20px" }}>
        I am the developer of this website. My name Oleh.
      </p>
      <a href="https://github.com/OPaslavskiy">This is my page on GitHub.</a>{" "}
      <p>I hope you enjoy using it!</p>
    </div>
  );
};
