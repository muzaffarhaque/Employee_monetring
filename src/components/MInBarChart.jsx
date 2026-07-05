
const data = [
  { month: "Jan", value: 35, active: false },
  { month: "Feb", value: 55, active: false },
  { month: "Mar", value: 85, active: true },
  { month: "Apr", value: 70, active: false },
  { month: "May", value: 50, active: false },
  { month: "Jun", value: 45, active: false },
];

export default function MiniBarChart() {
  return (
    <div className="chart">
      {data.map((item) => (
        <div className="chart-item" key={item.month}>
          <div
            className={`bar ${item.active ? "active" : ""}`}
            style={{ height: `${item.value}px` }}
          ></div>

          <span className={item.active ? "month active-text" : "month"}>
            {item.month}
          </span>
        </div>
      ))}
    </div>
  );
}