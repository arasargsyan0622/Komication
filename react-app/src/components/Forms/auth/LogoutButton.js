import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import "./AuthFormsCSS/Logout.css";
import { useHistory } from "react-router-dom";

import { io } from "socket.io-client";

let socket;

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    socket = io();
    return () => {
      socket.disconnect();
    };
  });

  const onLogout = async (e) => {
    socket.emit("offline", user);

    await dispatch(logout());

    history.push("/");
  };

  return <button className="user__logout" onClick={onLogout}></button>;
};

export default LogoutButton;
