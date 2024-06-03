import React, { useState, useEffect } from "react";
import "./ContainerItem.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductDataService from "../services/products";

export function ContainerItem(props) {
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const priceVND = vnd.format(props.price);

  const [CommentsCountAndAvgRatingStar, setCommentsCountAndAvgRatingStar] = useState();

  useEffect(() => {
    retrieveCommentsCountAndAvgRatingStar();
  }, []);

  const retrieveCommentsCountAndAvgRatingStar = () => {
    ProductDataService.getCommentCountAndAvgRating(props.masp)
      .then((res) => {
        setCommentsCountAndAvgRatingStar(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
  };

  return (
    <div className="containerItem">
      {/* // masp ở đây là cái éo gì mà đổi sang _id lại không chạyyyy */}
      <Link to={"/Products/" + props.masp} state={{ image: props.image }}>
        
          <img
            src={props.image}
            alt="sanpham"
            className="ContainerItem_image"
          />
          <div className="nameandprice">
            <p className="containerItem_name">{props.name}</p>
            <p className="containerItem_infor-price">
              <span className="containerItem_price">
                {priceVND}  
              </span>
              
              <span className="containerItem_reviews_AvgRating">
                <span
                  style={{
                    cursor: "pointer",
                    color: "gold",
                    fontSize: "19px",
                  }}
                >
                  &#9733;
                </span>&nbsp;
                {(CommentsCountAndAvgRatingStar !== undefined && CommentsCountAndAvgRatingStar.avgStar) ?  CommentsCountAndAvgRatingStar.avgStar : 0}
                &nbsp;|&nbsp;
                {(CommentsCountAndAvgRatingStar !== undefined && CommentsCountAndAvgRatingStar.qtyCmt) ?  CommentsCountAndAvgRatingStar.qtyCmt : 0} đánh giá
              </span>
            </p>
          </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // _products: state._todoProduct,
    // isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    // AddCart: (item) => dispatch(AddCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerItem);
