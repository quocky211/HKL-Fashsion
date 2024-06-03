import React, { useEffect, useState } from "react";
import "./Product.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Chart from "../Chart/Chart";
import { productData } from "../dummyData";
import { Publish } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import ProductDataService from "../../../services/products"
export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const[typeProduct, setTypeProduct]= useState([])
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);

  useEffect(()=>{
    getProduct();
  },[])

  const getProduct = () =>{
    ProductDataService.getProductById(location.state.product.product_id)
    .then(res=>{
      console.log(res.data[0].product)
      setTypeProduct(res.data[0].product)
    })
    .catch(err=>console.error(err))
  }
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h2 className="productTitle">Chi tiết sản phẩm</h2>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Doanh thu" />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src={location.state.product.path}
                  alt=""
                  className="productInfoImg"
                />
                <span className="productName">
                  {typeProduct.name}
                </span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Chất liệu: </span>
                  <span className="productInfoValue">{typeProduct.marterial}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Màu sắc:</span>
                  <span
                    className="productInfoValue"
                    style={{
                      backgroundColor: location.state.product.color,
                      borderRadius: "50%",
                      border: "1px solid black",
                      padding: "20px ",
                    }}
                  >
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Size:</span>
                  <span className="productInfoValue">
                    {location.state.product.size}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Giá:</span>
                  <span className="productInfoValue">{Number(typeProduct.price).toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Số lượng còn lại:</span>
                  <span className="productInfoValue">
                    {location.state.product.qty}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <div className="productFormItem">
                  <label>Tên sản phẩm</label>
                  <input type="text" placeholder="Áo thun" />
                </div>
                <div className="productFormItem">
                  <label>Loại</label>
                  <select>
                    <option value="ao">Áo thun</option>
                    <option value="quan">Áo khoác</option>
                    <option value="pk">Áo sơ mi</option>
                    <option value="pk">Áo polo</option>
                  </select>
                </div>
                <div className="productFormItem">
                  <label>Màu sắc</label>
                  <input type="text" placeholder="Xanh" />
                </div>
                <div className="productFormItem">
                  <label>Size</label>
                  <input type="text" placeholder="38" />
                </div>
                <div className="productFormItem">
                  <label>Giá</label>
                  <input type="text" placeholder="100" />
                </div>
                <div className="productFormItem">
                  <label>Số lượng còn lại </label>
                  <input type="text" placeholder="80" />
                </div>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={location.state.product.path}
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish style={{ cursor: "pointer" }} />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Sửa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
