import React from "react";
import { Drop, Div } from "./FilterTweets.style";
import "react-dropdown/style.css";

export const FiterTweets = ({ onSelectFilter }) => {
  const options = ["SHOW ALL", "FOLLOWING", "FOLLOW"];
  const defaultOption = options[0];

  return (
    <Div>
      <Drop
        options={options}
        onChange={onSelectFilter}
        value={defaultOption}
        placeholder="Select an option"
      />
    </Div>
  );
};
