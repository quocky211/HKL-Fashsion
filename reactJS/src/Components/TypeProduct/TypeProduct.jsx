import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import ContainerItem from '../ContainerItem';
import "./TypeProduct.css";
import { useEffect, useState } from 'react';
import ProductDataService from '../../services/products';
import CatagoryDataService from '../../services/catagories';
import React from 'react';
import MessengerComponent from '../MessengerComponent/MessengerComponent';
// const MessengerComponent = React.lazy(() =>
//     import("../MessengerComponent/MessengerComponent")
// );



function TypeProduct() {
    const { typeID } = useParams();
    const [catagory, setCategory] = useState("");
    const [typePoduct, setTypeProduct] = useState([]);

    useEffect(()=>{
        getProducts(typeID);
        getCatagorys(typeID);
    },[typeID]);

    const getProducts = (typeID) => {
        ProductDataService.getAllProductByTypeId(typeID)
        .then(res=>{
            setTypeProduct(res.data);

        })
        .catch(e=>{
            console.log(e);
        })
    }

    const getCatagorys = (typeID) => {
        CatagoryDataService.getAll()
        .then((res)=>{
            const data = res.data;
            var name = data.map((item) => item.name)
            setCategory(name[typeID-1]);
        })
        .catch(e=>{
            console.log(e);
        })
    }

    return (
        <div className="type-product-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item active>{catagory}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list-product-type">
                {typePoduct.map((item) => (
                    <div className="type-product_containerItem">
                        <ContainerItem
                            price={item.product.price}
                            name={item.product.name}
                            image={item.path}
                            masp={item.product._id}
                        />
                    </div>
                ))}
            </div>
            <MessengerComponent/>
        </div>
    );
}
export default TypeProduct;