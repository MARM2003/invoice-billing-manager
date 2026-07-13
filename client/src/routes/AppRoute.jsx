import { Routes, Route, Navigate } from "react-router-dom";
//register page
import RegisterPage from "../pages/auth/RegisterPage";
//login page
import LoginPage from "../pages/auth/LoginPage";
//proctected route
import ProtectedRoute from "./ProtectedRoute";
//profile complete
import CompleteProfilePage from "../pages/profile/CompleteProfilePage";
//sidebar content import
import DashboardPage from "../pages/dashboard/Dashboardpage";
import DashboardLayout from "../layouts/DashboardLayout";
import CustomersPage from "../pages/customer/CustomersPage"
import InvoicesPage from "../pages/invoice/InvoicesPage"
import PaymentsPage from "../pages/payment/PaymentsPage"
import SubscriptionPage  from "../pages/subscription/SubscriptionPage"
import SettingsPage from "../pages/settings/SettingsPage"


const AppRoutes = () => {
  return (
    <Routes>
      {/* register route */}
      <Route path="/register" element={<RegisterPage />} />
      {/* login route */}
      <Route path="/login" element={<LoginPage />} />


       <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

     

      <Route index element={<DashboardPage />} />
      <Route path="customers" element={<CustomersPage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="payments" element={<PaymentsPage />} />
      <Route path="subscription" element={<SubscriptionPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

      {/* Default Route */ }
  <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes >
  );
};

export default AppRoutes;