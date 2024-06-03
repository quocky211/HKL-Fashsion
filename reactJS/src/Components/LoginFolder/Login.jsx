import axios from "axios";
import { useState } from "react";
import { Button, Modal} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../Images/logoDefault.png";
import "./Login.css";

function Login(props) {
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
// show model
const [show, setShow] = useState(false);

const handleClose = () => {
    setShow(false);
};
const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: useremail,
      password: password,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post( "http://localhost:3001/user/login",user,config)
      .then((res) => {
        // console.log(res.data);
        if(res.data.accessToken && res.data.jsonUser)
        {
          window.localStorage.setItem("JWT", res.data.accessToken);
          window.localStorage.setItem("refreshToken",res.data.refreshToken);
          window.localStorage.setItem("user", JSON.stringify(res.data.jsonUser));
          window.localStorage.setItem("Email", useremail);
        }
        else{
          handleShow()
        }
        if (res.data.jsonUser.level === true) navigate("/Admin");
        else navigate("/");
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };
  return (
    <div className="">
      <div className="loginmain">
        <div className="loginmain-content">
          <div className="loginmain-body">
            <div className="logomain">
              <img className="logo" alt="" src={logo}></img>
            </div>

            <div className="loginForm">
              <h3>Đăng nhập</h3>
              <form action="POST" onSubmit={handleSubmit}>
                <input
                  value={useremail}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="username"
                  placeholder="Email"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Mật khẩu"
                  required
                />
                <button name="submit" type="submit">
                  Đăng nhập
                </button>
              </form>
              <br></br>
              <p>Bạn chưa có tài khoản? <Link to="/Register">Đăng ký ngay</Link></p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Đăng nhập thất bại</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
