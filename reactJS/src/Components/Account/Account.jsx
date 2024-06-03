import "./Account.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import UserDataService from "../../services/users";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Account() {
  const [userId, setUserId] = useState(-1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getInforUser();
  }, []);

  const getInforUser = () => {
    const result = localStorage.getItem("user");
    const user = JSON.parse(result);
    UserDataService.getUserById(user._id)
    .then(res=>{
      setUserId(res.data[0]._id);
      setName(res.data[0].name);
      setBirthday(moment(res.data[0].birthday).format("YYYY-MM-DD"));
      setGender(res.data[0].gender);
      setPhone(res.data[0].phone);
      setEmail(res.data[0].email);
      setAddress(res.data[0].address);
    })
    .catch(err => console.log(err));
    
  };

  const updateUser = () => {
    const data = {
      name: name,
      gender: gender,
      birthday: birthday,
      phone: phone,
      address: address,
    };
    UserDataService.editUser(userId, data)
      .then((res) => {
        handleClose();
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    BoughtOrders();
  }, []);
  const BoughtOrders = () => {
    const result = localStorage.getItem("user");
    const user = JSON.parse(result);
    UserDataService.getOrdersByUser(user._id)
    .then((res) => {
      setOrders(res.data);
    })
    .catch((err) =>console.log(err));
    
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  return (
    <div className="">
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Cập nhật tài khoản thành công
        </Alert>
      </Snackbar>
      <div className="account-info-container">
        <div className="account-info">
          <h3>Thông tin cá nhân</h3>
          <table cellSpacing={20}>
            <tr>
              <td>Họ và tên</td>
              <td>
                <input
                  type="text"
                  value={name}
                  size={30}
                  onChange={(event) => setName(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={gender === "Nam"}
                    onChange={(event) => setGender(event.target.value)}
                  />{" "}
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={gender === "Nữ"}
                    onChange={(event) => setGender(event.target.value)}
                  />{" "}
                  Nữ
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Khác"
                    checked={gender === "Khác"}
                    onChange={(event) => setGender(event.target.value)}
                  />{" "}
                  Khác
                </label>
              </td>
            </tr>
            <tr>
              <td>Ngày sinh</td>
              <td>
                <input
                  type="date"
                  value={birthday}
                  size={30}
                  onChange={(event) => setBirthday(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input
                  type="tel"
                  value={phone}
                  size={30}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" value={email} size={30} />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={address}
                  size={30}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td
                colSpan={2}
                style={{ textAlign: "center" }}
                className="button-submit"
              >
                <button type="submit" onClick={updateUser}>
                  Cập nhật
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div className="buy-history">
          <h3>Lịch sử mua hàng</h3>
          <table>
            <tr>
              <th>STT</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            {orders.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.address}</td>
                <td>{Number(item.total).toLocaleString("vi-VN")} đ</td>
                <td>{item.status}</td>
                <td>
                  <Link to={"/OrderDetail/" + item._id} state={{order: item}}>
                    <button>Xem chi tiết</button>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
export default Account;
