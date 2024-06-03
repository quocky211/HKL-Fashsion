import React, { useState, useEffect } from "react";
import "./Products.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContainerItem from "../ContainerItem";
import filtericon from "../Images/filter-icon.png";
import ProductDataService from "../../services/products";
import CatagoryDataService from "../../services/catagories";
import Pagination from "react-bootstrap/Pagination";
import { Typography, Box } from "@mui/material";

const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function Products() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const oldFilterCate =
        JSON.parse(localStorage.getItem("Filter"))?.category_detail ?? [];
    const oldFilterPrice =
        JSON.parse(localStorage.getItem("Filter"))?.price ?? 0;
    const [price, setPrice] = useState(oldFilterPrice);
    const [category, setCate] = useState(oldFilterCate);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [cataDetails, setCataDetails] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getProducts(price, categoryQuery, currentPage);
        getAllCataDetail();
    }, [currentPage, flag]);

    const getProducts = (price, categoryQuery, page) => {
        ProductDataService.getAllProducts(price, categoryQuery, page)
            .then((res) => {
                setProducts(res.data.result);
                setTotalPage(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    };

    const getAllCataDetail = () => {
        CatagoryDataService.getAllCataDetail()
            .then((res) => {
                setCataDetails(res.data);
            })
            .catch((err) => console.error(err));
    };

    const handleCurrPage = (event, number) => {
        setCurrentPage(number);
    };
    // filters
    const handleCheckboxChange = (value) => {
        if (category.includes(value)) {
            // Nếu giá trị đã tồn tại trong mảng, ta loại bỏ nó (khi ta bỏ chọn)
            setCate(category.filter((item) => item !== value));
        } else {
            // Nếu giá trị chưa tồn tại trong mảng, ta thêm nó vào
            setCate([...category, value]);
        }
    };
    const queryCate = (category) => {
        const result = category.reduce(function (query, item) {
            return query + "category_detail_id=" + item + "&";
        }, "");
        setCategoryQuery(result);
    };

    const handleFilter = (event) => {
        queryCate(category);
        let filter = {
            category_detail: category,
            price: price,
        };
        localStorage.setItem("Filter", JSON.stringify(filter));
        setShow(false);
        setFlag(!flag);
    };

    //page
    let items = [];
    for (let number = 1; number <= totalPage; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={(e) => handleCurrPage(e, number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    return (
        <div className="product-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter">
                <>
                    <Button variant="primary" onClick={handleShow}>
                        <img
                            src={filtericon}
                            alt="filtericon"
                            className="filter-img"
                        />{" "}
                        Bộ lọc
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Bộ lọc</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form action="">
                                <div className="container__products-nav">
                                    <p>Danh mục</p>
                                    {cataDetails.map(function (item) {
                                        return (
                                            <div className="" key={item._id}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="type_product"
                                                        checked={category.includes(
                                                            item._id
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                item._id
                                                            )
                                                        }
                                                    />
                                                    {item.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="find-product-price">
                                    <p>Lọc giá sản phẩm</p>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="1"
                                        value={1}
                                        checked={price == 1}
                                        onClick={(e) =>
                                            setPrice(
                                                e.target.value != price
                                                    ? e.target.value
                                                    : 0
                                            )
                                        }
                                    />
                                    <label htmlFor="1"> Dưới 100.000 đ</label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="2"
                                        value={2}
                                        checked={price == 2}
                                        onClick={(e) =>
                                            setPrice(
                                                e.target.value != price
                                                    ? e.target.value
                                                    : 0
                                            )
                                        }
                                    />
                                    <label htmlFor="2">
                                        {" "}
                                        100.000 đ - 300.000 đ
                                    </label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="3"
                                        value={3}
                                        checked={price == 3}
                                        onClick={(e) =>
                                            setPrice(
                                                e.target.value != price
                                                    ? e.target.value
                                                    : 0
                                            )
                                        }
                                    />
                                    <label htmlFor="3">
                                        {" "}
                                        300.000 đ - 500.000 đ
                                    </label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="4"
                                        value={4}
                                        checked={price == 4}
                                        onClick={(e) =>
                                            setPrice(
                                                e.target.value != price
                                                    ? e.target.value
                                                    : 0
                                            )
                                        }
                                    />
                                    <label htmlFor="4"> Trên 500.000 đ</label>
                                    <br></br>
                                </div>
                                <div className="filter-button">
                                    <input
                                        type="button"
                                        value="Áp dụng"
                                        onClick={handleFilter}
                                    />
                                </div>
                            </form>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            </div>
            {products.length !== 0 ? (
                <div className="all-product-store">
                    {products.map((item) => (
                        <div className="product_containerItem">
                            <ContainerItem
                                price={item.product.price}
                                name={item.product.name}
                                image={item.path}
                                masp={item.product._id}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Box
                    display="flex"
                    width="100%"
                    height="50vh"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography fontSize={24}>
                        Không tìm thấy sản phẩm nào!
                    </Typography>
                </Box>
            )}
            <div className="page">
                {products.length !== 0 && <Pagination>{items}</Pagination>}
            </div>
            <MessengerComponent />
        </div>
    );
}

export default Products;
