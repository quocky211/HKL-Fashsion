import React from "react";
import "./Sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  Timeline,
  PersonAddAlt,
  AddBusiness,
  List,
  CreditCard,
  FormatAlignJustify,
  Article,
  EditNote,
  LocalAtm,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Home</h3>
          <ul className="sidebarList">
            <Link to="/Admin" className="link-admin">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <Link to="/Admin/Orders" className="link-admin">
              <li className="sidebarListItem">
                <LocalAtm className="sidebarIcon" />
                Quản lý đơn hàng
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Menu</h3>
          <ul className="sidebarList">
            <Link to="/Admin/Users" className="link-admin">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/Admin/NewUser" className="link-admin">
              <li className="sidebarListItem">
                <PersonAddAlt className="sidebarIcon" />
                Thêm người dùng
              </li>
            </Link>
            <Link to="/Admin/TypeProducts" className="link-admin">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/Admin/NewTypeProduct" className="link-admin">
              <li className="sidebarListItem">
                <AddBusiness className="sidebarIcon" />
                Thêm sản phẩm
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitile">Catagory</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <List className="sidebarIcon" />
              Danh mục
            </li>
            <li className="sidebarListItem">
              <FormatAlignJustify className="sidebarIcon" />
              Loại
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
