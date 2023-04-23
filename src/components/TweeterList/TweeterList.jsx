import React from "react";
import { TweeterCard } from "../TweeterCard/TweeterCard";
import { List } from "./TweeterList.styled";
export const TweeterList = () => {
  return (
    <List>
      <TweeterCard />
    </List>
  );
};
