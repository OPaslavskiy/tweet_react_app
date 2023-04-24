import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  padding-left: 64px;
  padding-right: 64px;
  background-color: #2c3e50;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SignIn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LinkSignIn = styled.a`
  color: #fff;
`;

export const Link = styled(NavLink)`
  color: #fff;
  margin-left: 14px;
  margin-right: 4px;
  text-decoration: none;
`;

export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
  margin-left: 14px;
  line-height: 1.2;
`;
