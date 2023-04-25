import React, { useState, useEffect } from "react";
import { TweeterCard } from "../TweeterCard/TweeterCard";
import { List, ButtonBack, Div } from "./TweeterList.styled";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { animateScroll as scroll } from "react-scroll";
import { FiterTweets } from "../FilterTweets/FilterTweets";
import {
  getUsersPerPage,
  changeUsers,
  getAllUser,
} from "../../services/getFetch";

export const TweeterList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [showBtn, setShowBtn] = useState(true);
  const [filter, setFilter] = useState("SHOW ALL");
  const location = useLocation();

  const newUsers = JSON.parse(JSON.stringify(users));
  const ArrayId = JSON.parse(localStorage.getItem("ArrayId")) || [];

  let filteredUsers;

  useEffect(() => {
    selectUsers();
  }, [page]);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setTotalPages(Math.ceil(data.length / 3));
      })
      .catch((err) => {});
  }, []);

  function selectUsers() {
    getUsersPerPage(page)
      .then((data) => {
        setUsers([...users, ...data]);
      })
      .catch((err) => {});
  }

  function loadMore() {
    scroll.scrollMore(window.innerHeight - 125);
    setPage(page + 1);
    if (page + 1 === totalPages) {
      setShowBtn(false);
    }
  }

  function onSelectFilter(e) {
    setFilter(e.value);
  }

  if (filter === "SHOW ALL") {
    filteredUsers = users;
  }
  if (filter === "FOLLOWING") {
    filteredUsers = users.filter((user) => ArrayId.includes(user.id));
  }
  if (filter === "FOLLOW") {
    filteredUsers = users.filter((user) => !ArrayId.includes(user.id));
  }

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
    <>
      <Div>
        <ButtonBack to={location.state.from}>GO TO BACK</ButtonBack>
      </Div>

      <FiterTweets onSelectFilter={onSelectFilter} />

      <List>
        {filteredUsers.map((user) => (
          <TweeterCard
            key={user.id}
            user={user}
            changeFollowing={changeFollowing}
          />
        ))}
      </List>
      <Div>
        {showBtn && (
          <Button variant="contained" type="button" onClick={() => loadMore()}>
            Load More
          </Button>
        )}
      </Div>
    </>
  );
};
