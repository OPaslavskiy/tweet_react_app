import React from "react";
import { Link, P } from "./Home.styled";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  return (
    <div style={{ textAlign: "center" }}>
      {console.log(location)}
      <Link to="tweets" state={{ from: location }}>
        Your bloggers are here.
      </Link>
      <P style={{ marginTop: "20px" }}>
        I am the developer of this website. My name Oleh.
      </P>
      <a href="https://github.com/OPaslavskiy">This is my page on GitHub.</a>
      <P>I hope you enjoy using it!</P>
    </div>
  );
};
