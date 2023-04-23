import React from "react";
import { useState, useEffect } from "react";
import { getUsers, changeUsers } from "../services/getFetch";

export const Card = () => {
  const [users, setUsers] = useState([]);
  //   const [user, setUser] = useState(0);

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

  async function changeFollowing(id) {
    const newUsers = JSON.parse(JSON.stringify(users));
    const followers = newUsers.find((user) => user.id === id).followers + 1;
    const apdateUsers = newUsers.map((user) => {
      if (user.id === id) {
        return { ...user, followers: followers };
      } else {
        return user;
      }
    });

    // console.log(newArray);
    setUsers(apdateUsers);

    // console.log(newUsers);
    //
    // const userApdete = (newUsers.find((user) => user.id === id).followers =
    //   followers + 1);

    // const userApdete = newUsers.find((user) => user.id === id);
    // userApdete.followers = followers + 1;
    // console.log(userApdete);

    // changeUsers(id, user);
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <img src={user.avatar} width={62} height={62} alt={user.user} />
            <p>{user.tweets}</p>
            <p>TWEETS</p>
            <p>{user.followers}</p>
            <p>FOLLOWERS</p>
            <button type="submit" onClick={() => changeFollowing(user.id)}>
              FOLLOW
            </button>
          </div>
        );
      })}
    </div>
  );
};

//        <div>

// </div>
