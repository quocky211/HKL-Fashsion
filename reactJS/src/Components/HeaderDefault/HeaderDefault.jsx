import React, { useState, useEffect } from "react";
import CatagoryDataService from "../../services/catagories";
import "./HeaderDefault.css";
import shoppingIcon from "../Images/shopping-icon.png";
import Logo from "../Images/logoDefault.png";
import LogoMb from "../Images/icon.png"
// import Logo from "../Images/logoChristmas.png";
import { useNavigate } from "react-router-dom";
import ListTypeProduct from "../ListTypeProduct/ListTypeProduct";
import ListTypeProductMobile from "../ListTypeProductMobile/ListTypeProductMobile";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import usericon from "../Images/user-icon.png";
import sidebaricon from "../Images/sidebar-icon.png";
import searchicon from "../Images/black-search-icon.png";
import close from "../Images/close.webp";
import arrowbottom from "../Images/arrow-bottom.png";
import { useSelector, useDispatch } from "react-redux";
import { getToTals } from "../../redux/cartSlide";
import { logout } from "../../redux/credentials";

function HeaderDefault(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const layout = useSelector((state) => state.layoutState.layout);
    let navigate = useNavigate();
    var loveList = "/FavoriteProduct";
    if (window.localStorage.getItem("Email") == null) {
        loveList = "/Login";
    }
    
    function LoginclickHandler() {
        if (!user) {
            navigate("/Login");
        }
    }

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getToTals());
    }, [cart, dispatch]);

    const [catagories, setCategories] = useState([]);
    useEffect(() => {
        CatagoryDataService.getAll()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
            document.querySelector('.nav-mobile-input').addEventListener('click', function() {
                if(this.checked&&window.innerWidth < 535) {
                    document.querySelector('.navbar').style.zIndex = 3000;
                } else {
                    document.querySelector('.navbar').style.zIndex = 100; // Reset về giá trị mặc định
                }
            });
            document.querySelector('.search-input').addEventListener('click', function() {
                if(this.checked) {
                    document.querySelector('.navbar').style.zIndex = 3000;
                } else {
                    document.querySelector('.navbar').style.zIndex = 100; // Reset về giá trị mặc định
                }
            });
    }, []);

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch("");
        navigate("/Search", {
            state: {
                search,
            },
        });
    };
    const Logout = () => {
        window.localStorage.removeItem("JWT");
        window.localStorage.removeItem("Email");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem('Filter');

        navigate("/Login");
    };
    // setTimeout(Logout, 1800000)

    return (
        <Navbar bg="light" expand="lg" fixed="top" id="default">
            <Container fluid>
                <div className="sidebar-icon">
                    <label htmlFor="nav-mobile-input">
                        <img src={sidebaricon} alt="sidebaricon" />
                    </label>
                    <label htmlFor="search-input" className="searchicon">
                        <img src={searchicon} alt="searchicon" />
                    </label>
                </div>
                <input
                    type="checkbox"
                    name=""
                    className="nav-mobile-input"
                    id="nav-mobile-input"
                />
                <label
                    htmlFor="nav-mobile-input"
                    className="nav_overlay"
                ></label>
                <input
                    type="checkbox"
                    name=""
                    className="search-input"
                    id="search-input"
                />
                <label htmlFor="search-input" className="nav_overlay1"></label>
                <div className="nav-mobile">
                    <label
                        htmlFor="nav-mobile-input"
                        className="nav-mobile-close"
                    >
                        <img src={close} alt="close" />
                    </label>
                    <ul className="nav-mobile-list">
                        <Nav.Link href="/">Trang chủ</Nav.Link>
                        <hr />
                        <div className="mobile-product">
                            <Nav.Link href="/Products">Sản phẩm</Nav.Link>
                            <label htmlFor="product-list-mobile">
                                <img src={arrowbottom} alt="arrowbottom" />
                            </label>
                        </div>
                        <input
                            type="checkbox"
                            className="product-list-mobile"
                            id="product-list-mobile"
                        />
                        <ul className="type-mobile-product">
                            {catagories.map((item) => (
                                <ListTypeProductMobile
                                    _id={item._id}
                                    name={item.name}
                                />
                            ))}
                        </ul>
                        <hr />
                        {/* <Nav.Link href="/Outfits">Bộ phối</Nav.Link> */}
                        <hr />
                        <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
                        <hr />
                        {/* <Nav.Link href="/Blogs">Bài viết</Nav.Link> */}
                        <hr />
                        {/* <Nav.Link href={loveList}>
                            {" "}
                            Sản phẩm yêu thích{" "}
                        </Nav.Link> */}
                    </ul>
                </div>
                <div className="nav-mobile-search">
                    <label htmlFor="search-input" className="nav-mobile-close">
                        <img src={close} alt="close" />
                    </label>
                    <Form className="mobile-search" onSubmit={(e)=>handleSearch(e)}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit"
                            variant="outline-success"
                        >
                            Tìm
                        </Button>
                    </Form>
                </div>
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Shop quần áo" className="Logo" />
                    <img src={LogoMb} alt="Shop quần áo" className="Logo_mobile" />
                </Navbar.Brand>
                
                <Nav className="" style={{ maxHeight: "100px" }}>
                    <Nav.Link href="/">Trang chủ</Nav.Link>
                    <div className="product-header">
                        <Nav.Link href="/Products">Sản phẩm</Nav.Link>
                        <ul className="type-product">
                            {catagories.map((item) => (
                                <ListTypeProduct
                                    _id={item._id}
                                    name={item.name}
                                />
                            ))}
                        </ul>
                    </div>
                    {/* <Nav.Link href="/Outfits">Bộ phối</Nav.Link> */}
                    <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
                    {/* <Nav.Link href="/Blogs">Bài viết</Nav.Link> */}
                </Nav>
                <Form className="search" onSubmit={(e)=>handleSearch(e)}>
                    <Form.Control
                        type="search"
                        placeholder="Tìm kiếm"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit" className="ml-2" variant="outline-success" >
                        Tìm
                    </Button>
                </Form>
               

                {/* <Nav.Link className="lovelists" href={loveList}>
                    {" "}
                    Sản phẩm yêu thích{" "}
                </Nav.Link> */}
                <div className="cartandlogin">
                    <Nav.Link href="/ShoppingCart">
                        <img src={shoppingIcon} alt="cart" />
                        <span >{cart.cartTotalQuantity}</span>
                    </Nav.Link>
                    <button onClick={LoginclickHandler} className="logIn-btn">
                        <Nav.Link>
                            <img src={usericon} alt="User-icon" />{" "}
                        </Nav.Link>
                        {user != null && (
                            <ul className="list-infor-user">
                                <Nav.Link href="/Account">
                                    {" "}
                                    <li>Thông tin tài khoản</li>{" "}
                                </Nav.Link>
                                <Nav.Link  onClick={Logout}>
                                    {" "}
                                    <li>Đăng xuất</li>{" "}
                                </Nav.Link>
                            </ul>
                        )}
                    </button>
                </div>
            </Container>
        </Navbar>
    );
}
const mapStateToProps = (state) => {
    return {
        // numberCart: state._todoProduct.numberCart,
        // isLoggedin: state._todoProduct.isLoggedin,
    };
};
function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDefault);
