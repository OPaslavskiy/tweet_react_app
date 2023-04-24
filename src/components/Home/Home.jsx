import React from "react";
import { Link, Contacts } from "./Home.styled";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  return (
    <div style={{ textAlign: "center" }}>
      <h3>
        This application is made for people who want to have all their friends'
        numbers in one place.!!!!!!!!!!
      </h3>
      <Link to="tweets" state={{ from: location }}>
        Your bloggers are here.
      </Link>
    </div>
  );
};
