import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import { TweeterCard } from "../TweeterCard/TweeterCard";
import { Loader } from "../Loader/Loader";
import { List, ButtonBack, Div } from "./TweeterList.styled";

import Button from "@mui/material/Button";

import { FiterTweets } from "../FilterTweets/FilterTweets";
import {
  getUsersPerPage,
  changeUsers,
  getAllUser,
} from "../../services/getFetch";

const TweeterList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [showBtn, setShowBtn] = useState(true);
  const [filter, setFilter] = useState("SHOW ALL");
  const [status, setStatus] = useState("pending");
  const location = useLocation();

  const newUsers = JSON.parse(JSON.stringify(users));
  const ArrayId = JSON.parse(localStorage.getItem("ArrayId")) || [];

  let filteredUsers;

  useEffect(() => {
    getUsersPerPage(page)
      .then((data) => {
        setUsers((prev) => [...prev, ...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setStatus("stoped");
        setTotalPages(Math.ceil(data.length / 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function loadMore() {
    scroll.scrollMore(window.innerHeight - 125);
    setPage(page + 1);
    if (page + 1 === totalPages) {
      setShowBtn(false);
    }
  }

  function onSelectFilter(event) {
    setFilter(event.value);
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
    setUsers(() =>
      newUsers.map((user) => (user.id === id ? { ...user, followers } : user))
    );

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
      {status === "pending" ? (
        <Loader />
      ) : (
        <>
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
              <Button
                variant="contained"
                type="button"
                onClick={() => loadMore()}
              >
                {filteredUsers.length === 0 ? `Load ${filter}` : `Load more`}
              </Button>
            )}
          </Div>
        </>
      )}
    </>
  );
};

export default TweeterList;
