import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
`;
