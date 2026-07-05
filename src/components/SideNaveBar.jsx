import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiUserFollowLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideNaveBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="side-nave-bar">
      <div className="nave-upper">
        <div
          onClick={() => navigate("/nav/dashboard")}
          className={`icon mt-2 ${
            location.pathname === "/nav/dashboard" ? "active" : ""
          }`}
        >
          <RxDashboard />
        </div>

        <div
          onClick={() => navigate("/employee")}
          className={`icon mt-2 ${
            location.pathname === "/employee" ? "active" : ""
          }`}
        >
          <TbUsers />
        </div>

        <div
          onClick={() => navigate("/settings")}
          className={`icon mt-2 ${
            location.pathname === "/settings" ? "active" : ""
          }`}
        >
          <IoSettingsOutline />
        </div>
      </div>

      <div className="profile-frame">
        <div className="icon">
          <FiLogOut />
        </div>

        <div className="icon">
          <RiUserFollowLine />
        </div>
      </div>
    </div>
  );
}