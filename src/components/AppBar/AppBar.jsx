import { RiContactsFill } from "react-icons/ri";
import { BsFilePostFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";

import { Header, LogoLink } from "./AppBar.styled";

export const AppBar = () => {
  return (
    <Header className="header">
      <LogoLink to="/">
        <RiContactsFill style={{ color: "#fff" }} />
        Home
      </LogoLink>
      <LogoLink to="/tweets">
        <BsFilePostFill style={{ color: "#fff" }} />
        Tweets
      </LogoLink>
    </Header>
  );
};
