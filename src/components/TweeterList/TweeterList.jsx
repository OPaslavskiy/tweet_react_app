import React, { useState, useEffect } from "react";
import { TweeterCard } from "../TweeterCard/TweeterCard";
import { List, ButtonBack, Div } from "./TweeterList.styled";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  getUsersPerPage,
  changeUsers,
  getTotalPage,
} from "../../services/getFetch";
export const TweeterList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [showBtn, setShowBtn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    selectUsers();
  }, [page]);

  useEffect(() => {
    getTotalPage()
      .then((data) => {
        setTotalPages(Math.ceil(data));
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

  function LoadMore() {
    setPage(page + 1);
    if (page + 1 === totalPages) {
      setShowBtn(false);
    }
  }

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
    <>
      <Div>
        <ButtonBack to={location.state.from}>GO TO BACK</ButtonBack>
      </Div>

      <List>
        {users.map((user) => (
          <TweeterCard
            key={user.id}
            user={user}
            changeFollowing={changeFollowing}
          />
        ))}
      </List>
      <Div>
        {showBtn && (
          <Button variant="contained" type="button" onClick={() => LoadMore()}>
            Load More
          </Button>
        )}
      </Div>
    </>
  );
};