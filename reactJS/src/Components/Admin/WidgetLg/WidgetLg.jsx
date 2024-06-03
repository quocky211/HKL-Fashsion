import React, {useState, useEffect} from 'react'
import './WidgetLg.css'
import avatar from '../Images/avatar.jpg';
import OrderDataService from "../../../services/orders";
import moment from "moment";


export default function WidgetLg() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    OrderDataService.getAllOrders()
      .then(function (res) {
        setOrders(res.data.slice(-5));
      })
      .catch((err) => console.log(err));
  };

  const Button = ({type}) =>{
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle"> Đơn hàng mới</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Ngày</th>
          <th className="widgetLgTh">Tổng</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        {
          orders.map((order)=>(
            <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">{order.name}</span>
            </td>
            <td className="widgetLgDate">
              {moment(order.createdAt).format("L")}
            </td>
            <td className="widgetLgAmount">{Number(order.total).toLocaleString("vi-VN")} đ</td>
            <td className="widgetLgStatus">
              <Button type={order.status}/>
            </td>
         </tr>
          ))
        }
      </table>
    </div>
  )
}
