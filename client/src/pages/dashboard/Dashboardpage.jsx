
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.user.profilestatus) {
      navigate("/complete-profile", {
        replace: true,
      });
    }
  }, [user, navigate]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default DashboardPage;