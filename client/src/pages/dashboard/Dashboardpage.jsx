import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

import { getDashboardSummaryService } from "../../services/dashboard.service.js";
import DashboardSummaryCards from "./DashboardSummaryCards.jsx";
import MonthlyRevenueChart from "./MonthlyRevenueChart.jsx";
import DashboardSkeleton from "./DashboardSkeleton.jsx";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);

        const response = await getDashboardSummaryService();
        setDashboardData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Dashboard
      </Typography>
      <DashboardSummaryCards summary={dashboardData.summary} />
      <MonthlyRevenueChart monthlyRevenue={dashboardData.monthlyRevenue} />
    </Box>
  );
};

export default DashboardPage;