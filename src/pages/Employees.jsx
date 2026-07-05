import React, { useEffect, useRef, useState } from "react";
import employeeData from "../data/employees.json";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function Employees() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState(
    employeeData.slice(0, ITEMS_PER_PAGE)
  );

  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          visibleData.length < employeeData.length
        ) {
          setLoading(true);

          setTimeout(() => {
            const nextPage = page + 1;

            setVisibleData(
              employeeData.slice(0, nextPage * ITEMS_PER_PAGE)
            );

            setPage(nextPage);
            setLoading(false);
          }, 1500);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, loading, visibleData]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Location</th>
            <th>Phone</th>
            <th width="80"></th>
          </tr>
        </thead>

        <tbody>
          {visibleData.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="table-user">
                  <div className="table-avatar">EN</div>

                  <div className="table-user-info">
                    <div className="table-user-name">{employee.name}</div>
                  </div>
                </div>
              </td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.location}</td>
              <td>{employee.phone}</td>

              <td className="text-center">
                <NavLink to={`/employee/${employee.id}`} >
                  <button className="btn btn-light btn-sm">
                    <FiArrowRight size={18} />
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleData.length < employeeData.length && (
        <div
          ref={loaderRef}
          className="d-flex justify-content-center align-items-center py-3"
        >
          {loading && (
            <>
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading...
            </>
          )}
        </div>
      )}
    </div>
  );
}