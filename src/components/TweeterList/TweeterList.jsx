import React, { useState, useEffect } from "react";
import { TweeterCard } from "../TweeterCard/TweeterCard";
import { List } from "./TweeterList.styled";
import { getUsers, changeUsers } from "../../services/getFetch";
import Button from "@mui/material/Button";
export const TweeterList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    selectUsers();
  }, [page]);

  function selectUsers() {
    console.log(`selectUsers`);
    getUsers(page)
      .then((data) => {
        setUsers([...users, ...data]);
      })
      .catch((err) => {});
  }

  function LoadMore() {
    console.log(`LoadMore`);
    setPage(page + 1);
  }

  const newUsers = JSON.parse(JSON.stringify(users));
  const ArrayId = JSON.parse(localStorage.getItem("ArrayId")) || [];

  function updateFollowers(followers, id) {
    console.log(`updateFollowers`);
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
  return (
    <>
      <List>
        {users.map((user) => (
          <TweeterCard
            key={user.id}
            user={user}
            changeFollowing={changeFollowing}
          />
        ))}
      </List>
      <Button variant="contained" type="button" onClick={() => LoadMore()}>
        Load More
      </Button>
    </>
  );
};
