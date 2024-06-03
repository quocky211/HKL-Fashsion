import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import ContainerItem from '../ContainerItem';
import "./TypeProductDetail.css"
import ProductDataService from "../../services/products";
import CatagoryDataService from "../../services/catagories";
import { useState, useEffect } from "react";
import React from 'react';
const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function TypeProductDetail() {

    const { typedetailID } = useParams();
    const [products, setProducts] = useState([]);
    const [cataDetail, setCataDetail]= useState("");

    useEffect(() => {
        getProducts(typedetailID);
        getCataDetail(typedetailID);
    }, [typedetailID]);

    const getProducts = (typedetailID) =>{
        ProductDataService.getProductsByTypeDetailId(typedetailID)
        .then(res => setProducts( res.data))
        .catch(err => console.error(err))
    };

    const getCataDetail = (typedetailID) =>{
        CatagoryDataService.getCataDetailById(typedetailID)
        .then(res => setCataDetail( res.data[0].name))
        .catch(err => console.error(err))
    };

    return (
        <div className="type-product-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item active>{cataDetail}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list-product-typedetail">
                {products.map((item) =>
                    <div className="type-product-detail">
                        <ContainerItem
                            price={item.product.price}
                            name={item.product.name}
                            image={item.path}
                            masp={item.product._id}
                        />
                    </div>
                )}
            </div>
            <MessengerComponent/>
        </div>
    );
}
export default TypeProductDetail;