import React, { useState, useEffect } from "react";
import "./NewProduct.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductDataService from "../../../services/products";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function NewProduct() {
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

  const [image, setImg] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("path", image);
    formData.append("product_id", Number(typeProductId));
    formData.append("color", color);
    formData.append("size", size);
    formData.append("qty", Number(quantity));
    ProductDataService.createDetailProduct(formData)
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
        <div className="newProduct">
          <h1 className="newProductTitle">Thêm chi tiết sản phẩm</h1>
          <form className="newProductForm">
            <div className="newProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div className="newProductItem">
              <label>Màu sắc</label>
              <input
                type="text"
                placeholder="Xanh"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label>Size</label>
              <input
                type="text"
                placeholder="40"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label>Số lượng</label>
              <input
                type="text"
                placeholder="100"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              className="newProductButton"
              onClick={(e) => handleCreate(e)}
            >
              Tạo
            </button>
          </form>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thêm thành công</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => navigate("/Admin/Products/" + typeProductId)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
