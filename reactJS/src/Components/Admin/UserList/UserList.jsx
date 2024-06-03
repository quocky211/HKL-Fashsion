import React, { useState, useEffect } from "react";
import "./UserList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import moment from "moment";
import UserDataService from "../../../services/users";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";



export default function UserList() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/Login");
        } else if (!user.level) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [users]);

    const getUsers = () => {
        UserDataService.getAllUser()
            .then(function (res) {
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    };
    // delete
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(-1);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setUserId(id);
    };
    const handleDelete = (id) => {
        handleClose();
        UserDataService.deleteUser(id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };


    const columns = [
        { field: "_id", headerName: "ID", width: 70 },
        {
            field: "user",
            headerName: "Người dùng",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.name}</div>;
            },
        },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phone", headerName: "SĐT", width: 150 },
        { field: "address", headerName: "Địa chỉ", width: 150 },
        {
            field: "birthdays",
            headerName: "Ngày sinh",
            width: 150,
            renderCell: (params) => {
                return <div>{moment(params.row.birthday).format("L")}</div>;
            },
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/Admin/User/" + params.row._id}>
                            <button className="userListEdit">
                                {" "}
                                <Edit />{" "}
                            </button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleShow(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];


    return (
        <div>
            <Topbar />
            <div className="container-admin">
                <Sidebar />
                <div className="userlist">
                    <h2>Quản lý người dùng</h2>
                    <Box
                        className="box_container"
                        sx={{ height: 800, width: "96%" }}
                    >
                        <DataGrid
                            className="data_grid"
                            rows={users}
                            getRowId={(row) => row._id}
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
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={(e) => handleDelete(userId)}
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
    );
}
