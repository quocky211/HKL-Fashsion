import React, { useState, useEffect } from "react";
import "./NewUser.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import UserDataService from "../../../services/users";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewUser() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);
  const [level, setLevel] = useState("false");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [sdt, setSDT] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    let newUser = {
      email: email,
      password: password,
      name: name,
      gender: gender,
      address: address,
      birthday: birth,
      phone: sdt,
      level: level,
    };
    UserDataService.createUser(newUser)
      .then((response) => {
        handleShow();
      })
      .catch((e) => {
        alert("Thêm không thành công");
        console.log(e);
      });
  };

  // modal after click

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
      <div>
          <Topbar />
          <div className="container-admin">
              <Sidebar />
              <div className="newuser">
                  <h2 className="newUserTitle">Thêm người dùng</h2>
                  <div className="container">
                      <form action=" " className="form">
                          <div className="newUserForm">
                              <div className="newUserItem">
                                  <label>Họ và tên</label>
                                  <input
                                      type="text"
                                      placeholder="Nguyễn Văn A"
                                      onChange={(e) => setName(e.target.value)}
                                  />
                              </div>
                              <div className="newUserItem">
                                  <label>Giới tính</label>
                                  <div className="newUserGender">
                                      <label>
                                          <input
                                              type="radio"
                                              name="gender"
                                              value="Nam"
                                              onChange={(e) =>
                                                  setGender(e.target.value)
                                              }
                                          />{" "}
                                          Nam{" "}
                                      </label>
                                      <label>
                                          <input
                                              type="radio"
                                              name="gender"
                                              value="Nữ"
                                              onChange={(e) =>
                                                  setGender(e.target.value)
                                              }
                                          />{" "}
                                          Nữ{" "}
                                      </label>
                                      <label>
                                          <input
                                              type="radio"
                                              name="gender"
                                              value="Khác"
                                              onChange={(e) =>
                                                  setGender(e.target.value)
                                              }
                                          />{" "}
                                          Khác
                                      </label>
                                  </div>
                              </div>
                              <div className="newUserItem">
                                  <label>Kiểu người dùng</label>
                                  <select
                                      className="newUserSelect"
                                      name="active"
                                      id="active"
                                      onChange={(e) => setLevel(e.target.value)}
                                  >
                                      <option value="false">Người dùng</option>
                                      <option value="true">Admin</option>
                                  </select>
                              </div>
                              <div className="newUserItem">
                                  <label>Ngày sinh</label>
                                  <input
                                      type="date"
                                      placeholder="02/30/2000"
                                      onChange={(e) => setBirth(e.target.value)}
                                  />
                              </div>
                              <div className="newUserItem">
                                  <label>Số Điện Thoại</label>
                                  <input
                                      type="text"
                                      placeholder="012 3456 789"
                                      onChange={(e) => setSDT(e.target.value)}
                                  />
                              </div>
                              <div className="newUserItem">
                                  <label>Email</label>
                                  <input
                                      type="text"
                                      placeholder="nguyenvan@gmail.com"
                                      onChange={(e) => setEmail(e.target.value)}
                                  />
                              </div>
                              <div className="newUserItem">
                                  <label>Mặt khẩu</label>
                                  <input
                                      type="text"
                                      placeholder="password"
                                      onChange={(e) =>
                                          setPassword(e.target.value)
                                      }
                                  />
                              </div>
                              <div className="newUserItem">
                                  <label>Địa chỉ</label>
                                  <input
                                      type="text"
                                      placeholder="HCM"
                                      onChange={(e) =>
                                          setAddress(e.target.value)
                                      }
                                  />
                              </div>
                          </div>
                          <button
                              className="newUserButton"
                              onClick={(e) => handleCreate(e)}
                          >
                              Thêm người dùng
                          </button>
                      </form>
                  </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Thông báo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Thêm thành công</Modal.Body>
                  <Modal.Footer>
                      <Button
                          variant="secondary"
                          onClick={(e) => navigate("/Admin/Users")}
                      >
                          Đóng
                      </Button>
                  </Modal.Footer>
              </Modal>
          </div>
      </div>
  );
}
