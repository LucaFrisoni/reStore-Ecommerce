"use client";
import DashSideMenu from "../components/dashSideMenu/d";
import { Space } from "antd";
import { Navbar } from "../components/navbar/navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar></Navbar>
      <Space className="SideMenuAndPageContent">
        <DashSideMenu />
      {children}
      </Space>
    </div>
  );
}
