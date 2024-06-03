import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductDataService from "../../../services/products";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/material";

export default function ProductList() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/Login");
        } else if (!user.level) {
            navigate("/");
        }
    }, []);
    const { typeProductId } = useParams();

    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        ProductDataService.getProductDetail(typeProductId)
            .then(function (res) {
                console.log(res.data);
                setProductDetails(res.data);
            })
            .catch((err) => console.log(err));
    };

    // modal after click delete

    const [show, setShow] = useState(false);
    const [productDetailId, setProductDetailId] = useState(-1);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setProductDetailId(id);
    };

    const handleDelete = (id) => {
        handleClose();
        ProductDataService.deleteProductDetail(id)
            .then((response) => window.location.reload())
            .catch((err) => console.log(err));
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 70 },
        {
            field: "product",
            headerName: "Sản phẩm",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.path}
                            alt=""
                        />
                    </div>
                );
            },
        },
        {
            field: "color",
            headerName: "Màu sắc",
            width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        <span
                            style={{
                                backgroundColor: params.row.color,
                                borderRadius: "50%",
                                border: "1px solid black",
                                padding: "5px 13px",
                            }}
                            src={params.row.color}
                            alt=""
                        />
                    </div>
                );
            },
        },
        { field: "size", headerName: "Size", width: 100 },
        { field: "qty", headerName: "Số lượng", width: 100 },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={"/Admin/Product/" + params.row._id}
                            state={{ product: params.row }}
                        >
                            <button className="productListEdit">
                                {" "}
                                <Edit />{" "}
                            </button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
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
                <div className="productList">
                    <div className="productListTitle">
                        <h2>Chi tiết sản phẩm</h2>
                    </div>
                    <Box
                        style={{ height: 400, width: "98%" }}
                        className="add_product_detail_box"
                    >
                        <DataGrid
                            rows={productDetails}
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
                    <Link to={"/Admin/NewProduct/" + typeProductId}>
                        <button className="productListButton">Thêm</button>
                    </Link>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={(e) => handleDelete(productDetailId)}
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
