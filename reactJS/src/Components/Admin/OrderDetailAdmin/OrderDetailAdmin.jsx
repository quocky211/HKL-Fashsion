import React, { useState, useEffect } from "react";
import "./OrderDetailAdmin.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useParams, useLocation } from "react-router-dom";
import OrderDataService from "../../../services/orders";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function OrderDetailAdmin() {
    const { orderId } = useParams();
    const location = useLocation();
    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        getOrderDetail();
    }, []);
    const getOrderDetail = () => {
        OrderDataService.getOrderDetail(orderId).then((res) => {
            setOrderDetail(res.data);
        });
    };
    const [status, setStatus] = useState(location.state.order.status);

    const editStatus = () => {
        const data = {
            status: status,
        };
        console.log(data);
        OrderDataService.editOrder(orderId, data)
            .then((res) => {
                console.log(res);
                handleClose();
                handleClick();
            })
            .catch((err) => console.log(err));
    };
    const [open, setOpen] = React.useState(false);

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
        <div>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={alert.severity}
                    sx={{ width: "100%" }}
                >
                    Chỉnh sửa thành công
                </Alert>
            </Snackbar>
            <Topbar />
            <div className="container-admin">
                <Sidebar />
                <div className="orderDetailAdmin">
                    <div className="orderInfor">
                        <div className="orderInforItem">
                            <div className="orderInfortitle">
                                Thông tin giao hàng{" "}
                            </div>
                            <div className="orderInforDetail">
                                <p>
                                    <span>Họ tên:</span>
                                    {location.state.order.name}{" "}
                                </p>
                                <p>
                                    <span>Địa chỉ:</span>
                                    {location.state.order.address}
                                </p>
                                <p>
                                    <span>SĐT:</span>
                                    {location.state.order.phone}{" "}
                                </p>
                                {location.state.order.gmail ? (
                                    <p>
                                        <span>Gmail:</span>
                                        {location.state.order.gmail}{" "}
                                    </p>
                                ) : null}
                                {location.state.order.note ? (
                                    <p>
                                        <span>Note:</span>
                                        {location.state.order.note}{" "}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="orderInforItem">
                            <div className="orderInfortitle">
                                Thông tin thanh toán{" "}
                            </div>
                            <div className="orderInforDetail">
                                {location.state.order.pay_method === "cod" ? (
                                    location.state.order.status ===
                                    "Đã giao hàng" ? (
                                        <div className="">
                                            <p>Thanh toán khi nhận hàng</p>
                                            <p className="success">
                                                Thanh toán thành công
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <p>Thanh toán khi nhận hàng</p>
                                            <p className="fail">
                                                Chưa thanh toán
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div>
                                        <p>
                                            Thanh toán qua{" "}
                                            {location.state.order.pay_method}
                                        </p>
                                        <p className="success">
                                            Thanh toán thành công
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="orderInforItem">
                            <div className="orderInfortitle">
                                Trạng thái (Tùy chỉnh)
                            </div>
                            <div className="orderInforDetail">
                                <p className="success">Hiện tại: {status}</p>{" "}

                                <label
                                    style={{
                                        marginRight: "15px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Tùy chỉnh:{" "}
                                </label>
                                <select
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Đang xử lý">
                                        Đang xử lý
                                    </option>
                                    <option value="Đang vận chuyển">
                                        Đang vận chuyển
                                    </option>
                                    <option value="Hoàn thành">
                                        Hoàn thành
                                    </option>
                                </select>
                                <button
                                    className="editStatusBtn"
                                    onClick={editStatus}
                                >
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="orderProducts">
                        <table className="orderProductsTable">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th> Giá </th>
                                    <th> Số lượng </th>
                                    <th> Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.map((product) => (
                                    <tr>
                                        <td>
                                            <div className="orderProductItem">
                                                <img
                                                    src={product.path}
                                                    alt="Img"
                                                />
                                                <div className="orderProductInfor">
                                                    <p>{product.name}</p>
                                                    <p>
                                                        <span
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        >
                                                            Màu:
                                                        </span>
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    product.color,
                                                                borderRadius:
                                                                    "50%",
                                                                border: "1px solid black",
                                                                padding:
                                                                    "0 0 0px 20px ",
                                                            }}
                                                        ></span>
                                                    </p>
                                                    <p>
                                                        <span>
                                                            Size: {product.size}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {Number(
                                                product.amount
                                            ).toLocaleString("vi-VN")}{" "}
                                            đ
                                        </td>
                                        <td>{product.qty}</td>
                                        <td>
                                            {Number(
                                                product.total
                                            ).toLocaleString("vi-VN")}{" "}
                                            đ
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
