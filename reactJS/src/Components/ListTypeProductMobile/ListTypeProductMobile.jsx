import { Link } from "react-router-dom";
import arrowbottom from "../Images/arrow-bottom.png";
import "./ListTypeProductMobile.css";
import React, { useState, useEffect } from "react";
import CatagoryDataService from "../../services/catagories";

function ListTypeProductMobile(props) {
  const [open, setOpen] = useState(false);
  const [catagoryDetails, setCategoryDetails] = useState([]);

  function openDetail() {
    setOpen(!open);
  }

  useEffect(() => {
    CatagoryDataService.getAllDetail(props._id)
      .then((res) => {
        setCategoryDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props._id]);

  return (
    <li key={props.key} className="each-type-product-mobile">
      <Link to={"/Products/Type/" + props._id}>{props.name}</Link>
      <img src={arrowbottom} alt="arrowbottom" onClick={openDetail} />
      <ul className="detail-product-mobile">
        {catagoryDetails.map(
          (item) =>
            item.category_id === props._id && open === true && (
              <Link to={"/Products/TypeDetail/" + item._id}>
                <li>{item.name}</li>
              </Link>
            )
        )}
      </ul>
    </li>
  );
}

export default ListTypeProductMobile;
