import React, { useEffect, useRef, useState } from "react";
import attendenceData from "../data/attendance.json";

const ITEMS_PER_PAGE = 10;

export default function AttendanceTable() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState(
    attendenceData.slice(0, ITEMS_PER_PAGE)
  );

  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          visibleData.length < attendenceData.length
        ) {
          setLoading(true);

          // Simulate API delay
          setTimeout(() => {
            const nextPage = page + 1;

            setVisibleData(
              attendenceData.slice(0, nextPage * ITEMS_PER_PAGE)
            );

            setPage(nextPage);
            setLoading(false);
          }, 1500); // 1.5 second loader
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, loading, visibleData]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered mb-0">
        <thead>
          <tr>
            <th>People</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {visibleData.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="table-user">
                  <div className="table-avatar">{row.avatar}</div>

                  <div className="table-user-info">
                    <div className="table-user-name">{row.name}</div>
                  </div>
                </div>
              </td>

              <td>{row.checkIn}</td>
              <td>{row.checkOut}</td>

              <td>
                <div
                  className={`table-user-status ${
                    row.status === "Online"
                      ? "table-user-status-online"
                      : "table-user-status-offline"
                  }`}
                >
                  <span className="table-user-status-dot"></span>
                  {row.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleData.length < attendenceData.length && (
        <div
          ref={loaderRef}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: 20,
          }}
        >
          {loading && (
            <>
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Loading...</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}