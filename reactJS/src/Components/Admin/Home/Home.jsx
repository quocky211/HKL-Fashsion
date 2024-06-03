import React, { useEffect } from "react";
import "./Home.css";
import FeatureInfo from "../FeatureInfo/FeatureInfo";
import Chart from "../Chart/Chart";
import WidgetSm from "../WidgetSm/WidgetSm";
import WidgetLg from "../WidgetLg/WidgetLg";
import { userData } from "../dummyData";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="home-admin">
          <FeatureInfo />
          <Chart
            data={userData}
            title="Phân tích người dùng"
            grid
            dataKey="Người dùng"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </div>
  );
}
