import React from "react";
import { useState, useEffect } from "react";
import { getUsers, changeUsers, getUser } from "../services/getFetch";

export const Card = () => {
  const [users, setUsers] = useState([]);
  //   const [user, setUser] = useState([]);

  useEffect(() => {
    function selectUsers() {
      getUsers()
        .then((data) => {
          setUsers(data);
          //   Notiflix.Notify.success(
          //     `We have prepared for you the 20 best movies for today`
          //   );
        })
        .catch((err) => {
          //   Notiflix.Notify.failure(err);
        });
    }

    selectUsers();
  }, []);

  const changeFollowing = async (id) => {
    try {
      await getUser(id).then((data) => {
        handleChangeTweets(id, data);
      });
    } catch (error) {}
  };

  const handleChangeTweets = (id, data) => {
    const updatedUser = { ...data };

    updatedUser.followers = updatedUser.followers + 1;
    console.log(updatedUser);

    changeUsers(id, updatedUser);
  };

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
