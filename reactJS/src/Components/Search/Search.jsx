import React, { useState, useEffect } from "react";
import "./Search.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";
import ProductDataService from "../../services/products";
import ContainerItem from '../ContainerItem';
import { Typography, Box } from "@mui/material";
const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

export default function Search(props) {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductDataService.getProductsFromSearch(state.search)
      .then((res) => setProducts(res.data.docs))
      .catch((err) => console.log(err));
  }, [state.search]);

  return (
    <div className="search-page">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item active>{state.search}</Breadcrumb.Item>
      </Breadcrumb>
      {
        products.length !== 0 ?
        <div className="search-list-products">
          {products.map((product) => (
            <ContainerItem
              price={product.product.price}
              name={product.product.name}
              image={product.path}
              masp={product.product._id}
            />
          ))}
        </div>
        :
        <Box display='flex' width='100%' height='50vh' alignItems='center' justifyContent='center'>
            <Typography fontSize={24}>Không tìm thấy sản phẩm nào!</Typography>
        </Box>
          }
          <MessengerComponent/>
    </div>
  );
}
