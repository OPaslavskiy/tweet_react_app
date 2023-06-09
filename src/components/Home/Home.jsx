import React from "react";
import { Link, P, GitLink } from "./Home.styled";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/tweets">
        Welcome! Your bloggers or famous people are here.
      </Link>
      <P style={{ marginTop: "20px" }}>I am the developer of this website.</P>
      <GitLink href="https://github.com/OPaslavskiy">
        This is my page on GitHub.
      </GitLink>
      <P>I hope you enjoy using it!</P>
    </div>
  );
};

export default Home;
