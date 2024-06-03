import React, { useEffect, useState } from "react";
import "./WidgetSm.css";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import avatar from "../Images/avatar.jpg";
import UserDataService from "../../../services/users";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    UserDataService.getAllUser()
      .then(function (res) {
        setUsers(res.data.slice(-5));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Người dùng mới</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem">
            <img src={avatar} alt="avatar" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              <span className="widgetSmUserTitle">{user.phone}</span>
            </div>
            <Link to={"/Admin/User/" + user._id} className="link-admin">
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Truy cập
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
