import { useEffect } from 'react';
import './Dashboard.css';
import './viz.css';

const Dashboard = () => {
  useEffect(() => {
    if (!window.visualize) {
      console.error("visualize.js library is not loaded.");
      return;
    }
    window.visualize({
      auth: {
        name: "superuser",
        password: "superuser"
      }
    }, function (v) {
      v("#viz-container").adhocView({
        resource: "/public/Samples/Ad_Hoc_Views/VIZ/ExpensesOverTime",
        error: function (e) {
          console.log(e);
        }
      });
    });
  }, []);

  return (
    <div className="dashboard-page h-main-section">
      <h1>Welcome to the Dashboard</h1>

      {/* Provide container to render your visualization */}
      <div id="viz-container"></div>
    </div>
  );
};

export default Dashboard;