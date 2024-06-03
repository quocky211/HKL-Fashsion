import "./Register.css";
import React, { useState } from "react";
import logo from "../Images/logoDefault.png";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";
import axios from "axios";
function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandle = async (e) => {
    e.preventDefault();
    let newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      level: false,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(
        "http://localhost:3001/user/register",
        newUser,
        config
      )
      .then((res) => {
        if (res.status === 201) {
          navigate("/Login");
          alert("Đăng ký thành công");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <div className="">
      <div className="regismain">
        <div className="regismain-content">
          <div className="regismain-body">
            <div className="logomain">
              <img className="logo" src={logo} alt="logo"></img>
            </div>

            <div className="regisForm">
              <h3>Đăng ký</h3>
              <form autoComplete="on" action="POST" onSubmit={registerHandle} >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                  title="Mật khẩu tối thiểu 6 kí tự"
                  required
                />
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="submit" name="submit" onClick={registerHandle} >
                  Đăng ký
                </button>
              </form>
              <p>Bạn đã có tài khoản? <Link to="/Login">Đăng nhập ngay</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
