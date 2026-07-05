import React from 'react'


const rows = [
  { id: 1, name: 'John Doe', employeeId: 'EMP001', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Online', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', employeeId: 'EMP002', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Offline', avatar: 'JS' },
  { id: 3, name: 'Michael Brown', employeeId: 'EMP003', checkIn: '10:00 AM', checkOut: '07:00 PM', status: 'Online', avatar: 'MB' },
]

export default function CustomTable({tableData=rows}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered mb-0">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row) => (
            <tr key={row?.id}>
              <td>
                <div className="table-user">
                  <div className="table-avatar">
                    {row?.avatar}
                  </div>
                  <div className="table-user-info">
                    <div className="table-user-name">{row?.name}</div>
                    <div className={`table-user-status ${row?.status === 'Online' ? 'table-user-status-online' : 'table-user-status-offline'}`}>
                      <span className="table-user-status-dot"></span>
                      {row?.status}
                    </div>
                  </div>
                </div>
              </td>
              <td>{row?.employeeId}</td>
              <td>{row?.checkIn}</td>
              <td>{row?.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
