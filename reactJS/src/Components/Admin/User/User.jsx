import React, { useEffect, useState } from "react";
import "./User.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import avatar from "../Images/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";
import UserDataService from "../../../services/users";
import moment from "moment";

import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Transgender,
} from "@mui/icons-material";
export default function User() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const { userId } = useParams();
    const [userInfor, setUserInfor] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/Login");
        } else if (!user.level) {
            navigate("/");
        }
        getInforUser();
    }, []);
    

    const getInforUser = () => {
        UserDataService.getUserById(userId).then((res) => {
            setUserInfor(res.data[0]);
            setGender(res.data[0].gender);
            setBirthday(res.data[0].birthday)
            setPhone(res.data[0].phone)
            setEmail(res.data[0].email)
            setName(res.data[0].name)
            setAddress(res.data[0].address)
        console.log(res.data[0].gender)

        setBirthday(moment(res.data[0].birthday).format("YYYY-MM-DD"));
        setGender(res.data[0].gender);
        });

    };
   

    const updateUser = () => {
        const data = {
            name: name,
            gender: gender,
            birthday: birthday,
            email: email,
            phone: phone,
            address: address,
        };
        UserDataService.editUser(userId, data)
            .then((res) => {
                console.log(res);
                getInforUser(); // hiển thị thông tin sau khi cập nhật
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    return (
        <div>
            <Topbar />
            <div className="container-admin">
                <Sidebar />
                <div className="user">
                    <div className="userTitleContainer">
                        <h2 className="userTitle">Sửa thông tin người dùng</h2>
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img
                                    src={avatar}
                                    alt=""
                                    className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUserName">
                                        {userInfor.name}
                                    </span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Chi tiết</span>
                                <div className="userShowInfo">
                                    <PermIdentity className="userShowIcon" />
                                    <span className="userShowInfoTitle">
                                        {userInfor.name}
                                    </span>
                                </div>
                                {userInfor.birthday && (
                                    <div className="userShowInfo">
                                        <CalendarToday className="userShowIcon" />
                                        <span className="userShowInfoTitle">
                                            {moment(userInfor.birthday).format(
                                                "L"
                                            )}
                                        </span>
                                    </div>
                                )}
                                {userInfor.gender && (
                                    <div className="userShowInfo">
                                        <Transgender className="userShowIcon" />
                                        <span className="userShowInfoTitle">
                                            {userInfor.gender}
                                        </span>
                                    </div>
                                )}
                                <span className="userShowTitle">Liên lạc</span>
                                {userInfor.phone && (
                                    <div className="userShowInfo">
                                        <PhoneAndroid className="userShowIcon" />
                                        <span className="userShowInfoTitle">
                                            {userInfor.phone}
                                        </span>
                                    </div>
                                )}
                                <div className="userShowInfo">
                                    <MailOutline className="userShowIcon" />
                                    <span className="userShowInfoTitle">
                                        {userInfor.email}
                                    </span>
                                </div>
                                {userInfor.address && (
                                    <div className="userShowInfo">
                                        <LocationSearching className="userShowIcon" />
                                        <span className="userShowInfoTitle">
                                            {userInfor.address}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Chỉnh sửa</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Họ và tên</label>
                                        <input
                                            type="text"
                                            name=""
                                            defaultValue={name}
                                            placeholder="Quốc Kỳ"
                                            className="userUpdateInput"
                                            required
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Giới tính</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    
                                                    checked={gender==='Nam'?true:false}
                                                    value="Nam"
                                                    onChange={(e) =>
                                                        setGender(
                                                            e.target.value
                                                        )
                                                    }
                                                />{" "}
                                                Nam{"  "}
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                   checked={gender==='Nữ'?true:false}
                                                    value="Nữ"
                                                    onChange={(e) =>
                                                        setGender(
                                                            e.target.value
                                                        )
                                                    }
                                                />{" "}
                                                Nữ{" "}
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    checked={gender==='Khác'?true:false}
                                                    value="Khác"
                                                    onChange={(e) =>
                                                        setGender(
                                                            e.target.value
                                                        )
                                                    }
                                                />{" "}
                                                Khác
                                            </label>
                                        </div>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            defaultValue={birthday}
                                            className="userUpdateInput"
                                            required
                                            onChange={(event) =>
                                                setBirthday(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Số Điện Thoại</label>
                                        <input
                                            type="text"
                                            name=""
                                            defaultValue={phone}
                                            placeholder="0972389257"
                                            className="userUpdateInput"
                                            required
                                            onChange={(event) =>
                                                setPhone(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue={email}
                                            placeholder="quockynguyen02@gmail.com"
                                            className="userUpdateInput"
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            name=""
                                            placeholder="TP HCM"
                                            required
                                            defaultValue={address}
                                            className="userUpdateInput"
                                            onChange={(event) =>
                                                setAddress(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    className="userUpdateButton"
                                    onClick={updateUser}
                                >
                                    Cập nhật
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
