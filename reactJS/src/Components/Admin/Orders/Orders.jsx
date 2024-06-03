import React, { useState, useEffect } from "react";
import "./Orders.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import OrderDataService from "../../../services/orders";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Visibility, DeleteOutline } from "@mui/icons-material";
import Box from "@mui/material/Box";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrderList();
    }, []);
    const getOrderList = () => {
        OrderDataService.getAllOrders().then((res) => {
            setOrders(res.data);
        });
    };

    const [show, setShow] = useState(false);
    const [orderID, setOrderID] = useState(-1);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setOrderID(id);
    };

    const handleDelete = (id) => {
        handleClose();
        OrderDataService.deleteOrder(id)
            .then((res) => window.location.reload())
            .catch((err) => console.log(err));
    };
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 70,
        },
        {
            field: "name",
            headerName: "Tên",
            width: 180,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 300,
        },
        {
            field: "total",
            headerName: "Tổng",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="orderPrice">
                        {Number(params.row.total).toLocaleString("vi-VN")} đ
                    </div>
                );
            },
        },
        {
            field: "pay_method",
            headerName: "Thanh toán",
            width: 110,
            renderCell: (params) => {
                return (
                    <div className="orderPayMethod">
                        {params.row.pay_method}
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Tình trạng",
            width: 140,
            renderCell: (params) => {
                return <div className="orderStatus">{params.row.status}</div>;
            },
        },
        {
            field: "createdAt",
            headerName: "Ngày đặt",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="orderDate">
                        {moment(params.createdAt).format("L")}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={"/Admin/Orders/" + params.row._id}
                            state={{ order: params.row }}
                        >
                            <button className="orderDisplayBtn">
                                {" "}
                                <Visibility />{" "}
                            </button>
                        </Link>
                        <Button
                            variant="primary"
                            onClick={(e) => handleShow(params.row._id)}
                        >
                            <DeleteOutline className="orderDeleteBtn" />
                        </Button>
                    </>
                );
            },
        },
    ];
    // get STT
    const getRowId = (row, index) => {
        return index + 1; // Trả về số thứ tự từ 1
    };
    const rowsWithIds = orders.map((row, index) => ({
        ...row,
        id: getRowId(row, index),
    }));
    return (
        <div>
            <Topbar />
            <div className="container-admin">
                <Sidebar />
                <div className="orderList">
                    <h2>Quản lý đơn hàng</h2>
                    <Box
                        className="tableOrderList"
                        sx={{ height: 800, width: "99%" }}
                    >
                        <DataGrid
                            rows={rowsWithIds}
                            getRowId={(row) => row.id}
                            disableRowSelectionOnClick
                            columns={columns}
                            checkboxSelection
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 25, page: 0 },
                                },
                            }}

                        />
                    </Box>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={(e) => handleDelete(orderID)}
                            >
                                Xóa
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
