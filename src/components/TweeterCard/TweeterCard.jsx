import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import mainImage from "../../images/main_card_picture.png";
import { getUsers, changeUsers } from "../../services/getFetch";
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

export const TweeterCard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function selectUsers() {
      getUsers()
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => {});
    }
    selectUsers();
  }, []);

  const newUsers = JSON.parse(JSON.stringify(users));
  const ArrayId = JSON.parse(localStorage.getItem("ArrayId")) || [];

  function updateFollowers(followers, id) {
    const apdateUsers = newUsers.map((user) => {
      if (user.id === id) {
        return { ...user, followers: followers };
      } else {
        return user;
      }
    });
    setUsers(apdateUsers);
    const userApdete = newUsers.find((user) => user.id === id);
    userApdete.followers = followers;
    changeUsers(id, userApdete);
  }

  async function changeFollowing(id) {
    const hasIdLocalStorege = ArrayId.includes(id);

    if (hasIdLocalStorege) {
      const followers = newUsers.find((user) => user.id === id).followers - 1;
      const UpdateArrayId = ArrayId.filter((item) => item !== id);

      updateFollowers(followers, id);
      localStorage.setItem("ArrayId", JSON.stringify(UpdateArrayId));
    } else {
      const followers = newUsers.find((user) => user.id === id).followers + 1;
      updateFollowers(followers, id);

      ArrayId.push(id);
      localStorage.setItem("ArrayId", JSON.stringify(ArrayId));
    }
  }
  let buttonName = "";

  return (
    <>
      {users.map(({ id, avatar, user, tweets, followers }) => {
        const options = { style: "decimal", minimumFractionDigits: 0 };
        const formattedFollowers = followers.toLocaleString("en-US", options);
        {
          buttonName = ArrayId.includes(id) ? "FOLLOW" : "FOLLOWING";
        }
        return (
          <li key={id}>
            <Card>
              <Logo alt="GoIt" src={logo} />
              <MainCardImage alt="abstract" src={mainImage} />
              <Strip />
              <AvatarBorder>
                <Avatar src={avatar} width={62} height={62} alt={user} />
              </AvatarBorder>
              <Tweets>{tweets} TWEETS</Tweets>

              <Followers>{formattedFollowers} FOLLOWERS</Followers>

              <Button type="submit" onClick={() => changeFollowing(id)}>
                {buttonName}
              </Button>
            </Card>
          </li>
        );
      })}
    </>
  );
};
