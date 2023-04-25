import React from "react";
import logo from "../../images/logo.svg";
import mainImage from "../../images/main_card_picture.png";
import {
  Avatar,
  AvatarBorder,
  Card,
  Logo,
  MainCardImage,
  Strip,
  Tweets,
  Followers,
  Button,
} from "./TweeterCard.styled";

export const TweeterCard = ({
  user: { tweets, followers, avatar, id, user },
  changeFollowing,
}) => {
  const ArrayId = JSON.parse(localStorage.getItem("ArrayId")) || [];

  const options = { style: "decimal", minimumFractionDigits: 0 };
  const formattedFollowers = followers.toLocaleString("en-US", options);

  let buttonName = ArrayId.includes(id) ? "FOLLOWING" : "FOLLOW";

  return (
    <li>
      <Card>
        <Logo alt="GoIt" src={logo} />
        <MainCardImage alt="abstract" src={mainImage} />
        <Strip />
        <AvatarBorder>
          <Avatar src={avatar} width={62} height={62} alt={user} />
        </AvatarBorder>
        <Tweets>{tweets} TWEETS</Tweets>

        <Followers>{formattedFollowers} FOLLOWERS</Followers>

        <Button
          type="submit"
          onClick={() => changeFollowing(id)}
          style={{
            backgroundColor: buttonName === "FOLLOWING" ? "#5CD3A8" : "#EBD8FF",
          }}
        >
          {buttonName}
        </Button>
      </Card>
    </li>
  );
};
