import React, { useState, useEffect } from "react";
import { getUsers, changeUsers } from "../services/getFetch";

export const Card = () => {
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

  let buttonName = "";
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

  return (
    <ul>
      {users.map((user) => {
        {
          buttonName = ArrayId.includes(user.id) ? "Unfollow" : "Follow";
        }
        return (
          <li key={user.id}>
            <img src={user.avatar} width={62} height={62} alt={user.user} />
            <p>{user.tweets}</p>
            <p>TWEETS</p>
            <p>{user.followers}</p>
            <p>FOLLOWERS</p>
            <button type="submit" onClick={() => changeFollowing(user.id)}>
              {buttonName}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
