import Dropdown from "react-dropdown";
import React from "react";
import "react-dropdown/style.css";

export const FiterTweets = ({ onSelectFilter }) => {
  const options = ["SHOW ALL", "FOLLOWING", "FOLLOW"];
  const defaultOption = options[0];

  return (
    <Dropdown
      options={options}
      onChange={onSelectFilter}
      value={defaultOption}
      placeholder="Select an option"
    />
  );
};
