import React, { useState, useEffect } from "react";
import "./TypeProductEdit.css";
import { useParams } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Chart from "../Chart/Chart";
import { useNavigate } from "react-router-dom";

import { typeProductData } from "../dummyData";
import ProductDataService from "../../../services/products";
import CatagoryDataService from "../../../services/catagories";

export default function TypeProductEdit() {
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

  const [product, setProduct] = useState({});
  const [cataName, setCatName] = useState("");
  const [cata, setCata] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [cataList, setCataList] = useState([]);
  const [cataId, setCataId] = useState(1);
  const [cataDetailList, setCataDetailList] = useState([]);
  const [categoryDetailId, setCategoryDetailId] = useState(0);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [marterial, setMarterial] = useState("");
  const [description, setDesciption] = useState("");

  useEffect(() => {
    getProduct();
    getQuantity();
    getCatas();
  }, [cataId]);

  const getProduct = () => {
    ProductDataService.getProductById(typeProductId)
      .then(function (res) {
        getCata(res.data[0].product.category_detail_id);
        getCataName(res.data[0].product.category_id);
        setProduct(res.data[0].product);
        setCategoryDetailId(res.data[0].product.category_detail_id);

        setName(res.data[0].product.name);
        setPrice(res.data[0].product.price);
        setMarterial(res.data[0].product.marterial);
        setDesciption(res.data[0].product.description)
        console.log(res.data[0].product);
      })
      .catch((err) => console.log(err));
  };

  const getCata = (detailId) => {
    CatagoryDataService.getCataDetailById(detailId)
      .then((res) => setCata(res.data[0].name))
      .catch((err) => console.log(err));
  };

  const getCataName = (category_id) => {
    CatagoryDataService.getAll()
      .then(function (res) {
        const data = res.data;
        var category = data.find((c) => c._id === category_id);
        setCatName(category.name);
        setCataId(category._id);
      })
      .catch((err) => console.log(err));
  };

  const getCatas = () => {
    CatagoryDataService.getAll()
      .then(function (res) {
        getCataDetail();
        setCataList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCataDetail = () => {
    CatagoryDataService.getAllDetail(cataId)
      .then(function (res) {
        setCataDetailList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getQuantity = () => {
    ProductDataService.getProductDetail(typeProductId)
      .then(function (res) {
        const data = res.data;
        const giaTriKhoiTao = 0;
        const tinhTong = (boTichLuy, phanTuHienTai) => {
          return boTichLuy + phanTuHienTai.qty;
        };
        var quantity = data.reduce(tinhTong, giaTriKhoiTao);
        setQuantity(quantity);
      })
      .catch((err) => console.log(err));
  };

  const handleCata = (e) => {
    setCataId(e.target.value);
  };

  const handleCataDetail = (e) => {
    setCategoryDetailId(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = {
      category_id: cataId,
      category_detail_id: categoryDetailId,
      name: name,
      description: description,
      price: price,
      discount: discount,
      marterial: marterial,
    };
    ProductDataService.editProduct(typeProductId,data)
      .then((response) => {
        // setHasCreate(true);
        alert("Sửa sản phẩm thành công");
        navigate("/Admin/TypeProducts");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="typeProductEdit">
          <div className="typeProductTitleContainer">
            <h2 className="typeProductTitle">Sản phẩm</h2>
          </div>
          <div className="typeProductTop">
            <div className="typeProductTopLeft">
              <Chart
                data={typeProductData}
                dataKey="Sales"
                title="Doanh thu"
              />
            </div>
            <div className="typeProductTopRight">
              <div className="typeProductInfoTop">
                <span className="typeProductName">{product.name}</span>
              </div>
              <div className="typeProductInfoBottom">
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Id:</span>
                  <span className="typeProductInfoValue">{product._id}</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Danh mục:</span>
                  <span className="typeProductInfoValue">{cataName}</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Chất liệu:</span>
                  <span className="typeProductInfoValue">
                    {product.marterial}
                  </span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Loại:</span>
                  <span className="typeProductInfoValue">{cata}</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Giá:</span>
                  <span className="typeProductInfoValue">
                    {vnd.format(product.price)}
                  </span>
                </div>

                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Tổng số lượng:</span>
                  <span className="typeProductInfoValue">{quantity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="typeProductBottom">
            <form className="typeProductForm">
              <div className="typeProductFormLeft">
                <div className="typeProductFormItem">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    placeholder="Áo thun"
                    defaultValue={product.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="typeProductFormItem">
                  <label>Danh mục</label>
                  <select value={cataId} onChange={(e) => handleCata(e)}>
                    {cataList.map(function (item) {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="typeProductFormItem">
                  <label>Chất liệu</label>
                  <input
                    type="text"
                    placeholder="Vải cotton"
                    defaultValue={product.marterial}
                    onChange={(e) => setMarterial(e.target.value)}
                  />
                </div>
                <div className="typeProductFormItem">
                  <label>Giá</label>
                  <input
                    type="text"
                    placeholder="100"
                    defaultValue={product.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="typeProductFormItem">
                  <label>Loại</label>
                  <select value={categoryDetailId} onChange={(e) => handleCataDetail(e)}>
                    {cataDetailList.map(function (item) {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="typeProductFormItem">
                  <label>Tỉ lệ giảm giá </label>
                  <input
                    type="text"
                    placeholder="15%"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="typeProductFormItem">
                  <label>Mô tả</label>
                  <textarea
                    cols="10"
                    rows="5"
                    defaultValue={description}
                    onChange={(e) => setDesciption(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="typeProductFormRight">
                <button
                  className="typeProductButton"
                  onClick={(e) => handleUpdate(e)}
                >
                   Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
