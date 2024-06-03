import React, { useState, useEffect } from 'react';
import CatagoryDataService from '../../services/catagories';
import { Link } from "react-router-dom";

function ListTypeProduct(props)
{   
    const [catagoryDetails, setCategoryDetails] = useState([]);
    useEffect(() =>{
        CatagoryDataService.getAllDetail(props._id)
        .then(res=>{
            setCategoryDetails(res.data)
        })
        .catch(e => {
            console.log(e);
        });
    },[props._id])

    return(
        <Link to={"/Products/Type/" + props._id}>
            <li className="each-type-product">
                {props.name}
                <ul className="detail-product">
                    {
                        catagoryDetails.map((item, index) => item.category_id === props._id && (
                            <Link key={index} to={"/Products/TypeDetail/" + item._id}>
                                <li>{item.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </li>
        </Link>

        
    );
}
export default ListTypeProduct;