import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./viz.css";

const charts = [
  {
    name: "Expenses By Categories and Payment Methods",
    resource: "/public/Samples/Ad_Hoc_Views/VIZ/ExpensesOverTime",
  },
  {
    name: "Expenses By Date",
    resource: "/public/Samples/Ad_Hoc_Views/VIZ/ExpensesByDate",
  },
  {
    name: "Expenses By Department And Approval Status",
    resource:
      "/public/Samples/Ad_Hoc_Views/VIZ/ExpensesByDepartmentAndApprovalStatus",
  },
];

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState(charts[0].resource);

  useEffect(() => {
    if (!window.visualize) {
      console.error("visualize.js library is not loaded.");
      return;
    }
    window.visualize(
      {
        auth: {
          name: "superuser",
          password: "superuser",
        },
      },
      (v) => {
        v("#viz-container").adhocView({
          resource: selectedChart,
          error: (e) => {
            console.log(e);
          },
        });
      }
    );
  }, [selectedChart]);

  return (
    <main className="dashboard-page h-main-section">
      <section className="sidebar">
        <h2>Charts</h2>
        <ul>
          {charts.map((chart) => (
            <li
              key={chart.resource}
              className={chart.resource === selectedChart ? "active" : ""}
              onClick={() => setSelectedChart(chart.resource)}
            >
              {chart.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="main-content">
        <h1>Welcome to the Dashboard</h1>

        {/* Provide container to render your visualization */}
        <div id="viz-container"></div>
      </section>
    </main>
  );
};

export default Dashboard;
