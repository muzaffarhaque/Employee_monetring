import React, { useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import { SlCalender } from "react-icons/sl";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRoundX } from "react-icons/lu";
import { CiWallet } from "react-icons/ci";
import { NavLink, useLocation, useParams } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import { AttendanceTable, CustomTable, MiniBarChart } from "../components";
import { FcVoicePresentation } from "react-icons/fc";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

const formatDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
const employeeStatus = [
  {
    name: "Employee's Present Today",
    color: "#A7F3D0",
  },
  {
    name: "Employee's on leave",
    color: "#FDE68A",
  },
  {
    name: "Employee's Late Today",
    color: "#F9A8D4",
  },
];
const salaryTableData = [
  {
    id: 1,
    name: "John Smith",
    employeeId: "EMP001",
    basicSalary: "₹45,000",
    allowances: "₹8,000",
    deductions: "₹2,500",
    netSalary: "₹50,500",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Emma Johnson",
    employeeId: "EMP002",
    basicSalary: "₹52,000",
    allowances: "₹7,500",
    deductions: "₹3,000",
    netSalary: "₹56,500",
    paymentStatus: "Paid",
  },
  {
    id: 3,
    name: "Michael Brown",
    employeeId: "EMP003",
    basicSalary: "₹38,000",
    allowances: "₹5,500",
    deductions: "₹1,800",
    netSalary: "₹41,700",
    paymentStatus: "Pending",
  },
  {
    id: 4,
    name: "Sophia Wilson",
    employeeId: "EMP004",
    basicSalary: "₹60,000",
    allowances: "₹10,000",
    deductions: "₹4,000",
    netSalary: "₹66,000",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    name: "David Miller",
    employeeId: "EMP005",
    basicSalary: "₹42,000",
    allowances: "₹6,000",
    deductions: "₹2,200",
    netSalary: "₹45,800",
    paymentStatus: "Processing",
  },
];
const presentData = [
  {
    id: 1,
    name: "John Doe",
    employeeId: "EMP001",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Online",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    employeeId: "EMP002",
    checkIn: "08:45 AM",
    checkOut: "05:45 PM",
    status: "Offline",
    avatar: "JS",
  },
  {
    id: 3,
    name: "Michael Brown",
    employeeId: "EMP003",
    checkIn: "10:00 AM",
    checkOut: "07:00 PM",
    status: "Online",
    avatar: "MB",
  },
];
export default function Dashboard() {
  const [ranges, setRanges] = useState([]);
  const params = useParams()
  console.table(params)

  return (
    <div className="dashboard-content-section">
      <div className="header-nave-bar">
        <ul>
          <li>
            <NavLink to="/nav/dashboard" activeClassName="active">
              {" "}
              <MdOutlineSpaceDashboard /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/nav/attendance" activeClassName="active">
              {" "}
              <SlCalender /> Attendance
            </NavLink>
          </li>
          <li>
            <NavLink to="/nav/leaves" activeClassName="active">
              {" "}
              <LuUserRoundX /> Leaves
            </NavLink>
          </li>
          <li>
            <NavLink to="/nav/salary" activeClassName="active">
              {" "}
              <CiWallet /> Salary
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="title-header">
        <div className="head-frame">
          <h4 className="fs-34-28">Hello, Muzaffarul haque!</h4>
          <p className="fs-18-14">Welcome to your dashboard : </p>
        </div>
        {params.tab === "dashboard" && (<DateRangePicker ranges={ranges} setRanges={setRanges} />)}
        
      </div>
      <div className="body-content-frame">
        {params.tab === "dashboard" && (
        <div className="hero-content-frame d-flex ">
          <div className="main-highlights-content">
            <div className="highlight-card">
              <h5 className="fs-34-28 mb-5">Total Employees</h5>
              <div className="card-row-bt">
                <p className="fs-28-18 mb-0 fw-bold">1,234</p>
                <div className="graph-wrapper">
                  <MiniBarChart />
                </div>
              </div>
            </div>

            {employeeStatus.map((status, index) => (
              <div className="highlight-card">
                <h5 className="fs-24-16 mb-5">{status.name} </h5>
                <div className="card-row-bt">
                  <p className="fs-28-18 mb-0 fw-bold">14</p>
                  <div className="graph-wrapper">
                    <GaugeChart
                      id="dashboard-gauge"
                      nrOfLevels={2}
                      arcsLength={[0.75, 0.25]}
                      colors={[status.color, "#e1e1e1"]}
                      percent={0.75}
                      arcPadding={0}
                      arcWidth={0.21}
                      hideText={true}
                      needleColor="#8deacb"
                      needleBaseColor="#777"
                      animate={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="right-col-frame w-full">
            <div className="employ-present-table">
              <h5 className="fs-28-18 px-3 mt-2 pt-2">
                <FcVoicePresentation className="mb-1 " /> Employees In Office
              </h5>
              <div className="table-responsive">
                <table className="table table-striped table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>People</th>
                      <th>Check In</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presentData?.map((row) => (
                      <tr key={row?.id}>
                        <td>
                          <div className="table-user">
                            <div className="table-avatar">{row?.avatar}</div>
                            <div className="table-user-info">
                              <div className="table-user-name">{row?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{row?.checkIn}</td>
                        <td>
                          <div
                            className={`table-user-status ${row?.status === "Online" ? "table-user-status-online" : "table-user-status-offline"}`}
                          >
                            <span className="table-user-status-dot"></span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="employ-present-table">
              <h5 className="fs-28-18 px-3 mt-3 pt-2 ">
                <LiaBirthdayCakeSolid className="mb-2 " />
                Birthdays{" "}
              </h5>
              <div className="table-responsive">
                <table className="table table-striped table-bordered mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="table-user">
                          <div className="table-avatar">AL</div>
                          <div className="table-user-info">
                            <div className="table-user-name">
                              Ampthon locket
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>21 jan 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
       ) }
       {(params.tab === "dashboard" || params.tab === "attendance") && (
        <div className="attendance-table-frame mt-5">
          <h4 className="fs-34-28 mb-3">Todays Attendance </h4>
          <div className="table-frame">
             {(params.tab === "attendance")? <AttendanceTable />: <CustomTable />}
          </div>
        </div>
       )}
 

   {(params.tab === "leaves") && (
        <div className="attendance-table-frame mt-5">
          <h4 className="fs-34-28 mb-3">Todays Leaves </h4>
          <div className="table-frame">
              <div className="table-responsive">
                <table className="table table-striped table-bordered mb-0">
                
                  <tbody>
                    {presentData?.map((row,i) => (
                      <tr key={row?.id}>
                        <td>
                          <div className="table-user">
                            <div className="table-avatar">{row?.avatar}</div>
                            <div className="table-user-info">
                              <div className="table-user-name">{row?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>  {new Date().toISOString().split("T")[0]}</td>
                        <td>
                          {i + 1} day
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
       )}


        {params.tab === "salary" && (
        <div className="table-responsive">
        <table className="table table-striped table-bordered mb-0">
        <thead>
        <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
        </tr>
        </thead>

        <tbody>
        {salaryTableData.map((row) => (
            <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.employeeId}</td>
            <td>{row.basicSalary}</td>
            <td>{row.allowances}</td>
            <td>{row.deductions}</td>
            <td>{row.netSalary}</td>
            <td>
                <span
                className={`badge ${
                    row.paymentStatus === "Paid"
                    ? "bg-success"
                    : row.paymentStatus === "Pending"
                    ? "bg-warning text-dark"
                    : "bg-info"
                }`}
                >
                {row.paymentStatus}
                </span>
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        )}
      </div>
    </div>
  );
}
