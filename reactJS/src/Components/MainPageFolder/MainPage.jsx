import "./MainPage.css";
import ContainerItem from "../ContainerItem";
import { useState, useEffect } from "react";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductDataService from "../../services/products";


const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);


function MainPage() {
    const [newProducts, setNewProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        getNewProducts();
        getDiscountProducts();
        getTopProducts();
    }, []);

    function getNewProducts() {
        ProductDataService.getProductNew()
            .then((res) => setNewProducts(res.data))
            .catch((err) => console.error(err));
    }

    const getDiscountProducts = () => {
        ProductDataService.getProductDiscount()
            .then((res) => setDiscountProducts(res.data))
            .catch((err) => console.error(err));
    };

    const getTopProducts = () => {
        ProductDataService.getProductTopSelling()
            .then((res) => setTopProducts(res.data))
            .catch((err) => console.error(err));
    };

    let settings = {
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows:1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        vertical: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                rows:1
              }
            },
            {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  // initialSlide: 2,
                  rows:1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                rows:1
              }
            }
        ]
    };
    return (
        <div className="mainPage" id='slider_mainpage'>
            <div className="newProducts">
                <div className="newProducts_product product">
                    <h2 className="newProducts_name title-name title-name-first">
                        Sản phẩm mới
                    </h2>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {newProducts.map((item, idx) => (
                                <ContainerItem
                                    key={idx}
                                    price={item.product.price}
                                    name={item.product.name}
                                    image={item.path}
                                    masp={item.product._id}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="bestSeller">
                <div className="bestSeller_product product">
                    <h2 className="bestSeller_name title-name">Bán chạy</h2>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {topProducts.map((item, index) => (
                                <ContainerItem
                                    price={item.product.price}
                                    name={item.product.name}
                                    image={item.path}
                                    masp={item.product._id}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="onSale">
                <div className="onSale_product product">
                    <h2 className="onSale_name title-name">Giảm giá</h2>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {discountProducts.map((item) => (
                                <ContainerItem
                                    price={item.product.price}
                                    name={item.product.name}
                                    image={item.path}
                                    masp={item.product._id}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <MessengerComponent/>
        </div>
    );
}

export default MainPage;
