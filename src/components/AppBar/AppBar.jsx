import { RiContactsFill } from "react-icons/ri";
import { BsFilePostFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { Header, LogoLink, Link } from "./AppBar.styled";

export const AppBar = () => {
  const location = useLocation();
  return (
    <Header className="header">
      <LogoLink to="/">
        <RiContactsFill style={{ color: "#fff" }} />
        Home{" "}
      </LogoLink>
      {console.log(`appBar`, location)}
      <LogoLink to="tweets" state={{ from: location }}>
        <BsFilePostFill style={{ color: "#fff" }} />
        Tweets
      </LogoLink>
    </Header>
  );
};
