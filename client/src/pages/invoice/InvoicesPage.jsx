// import { useState } from "react";
// import { Box, Typography } from "@mui/material";

// import InvoiceSummaryCards from "../../components/invoices/InvoiceSummaryCards.jsx";
// import InvoiceToolbar from "../../components/invoices/InvoiceToolbar.jsx";
// import InvoiceTable from "../../components/invoices/InvoiceTable.jsx";
// import InvoiceSkeleton from "../../components/invoices/InvoiceSkeleton.jsx";
// import InvoiceEmptyState from "../../components/invoices/InvoiceEmptyState.jsx";
// import InvoiceDialog from "../../components/invoices/InvoiceDialog.jsx";
// import InvoiceDrawer from "../../components/invoices/InvoiceDrawer.jsx";
// import InvoiceDeleteDialog from "../../components/invoices/InvoiceDeleteDialog.jsx";
// import PaymentHistoryDrawer from "../../components/payments/PaymentHistoryDrawer.jsx";
// import usePayments from "../../hooks/usePayments.js";
// import ManualPaymentModal from "../../components/payments/ManualPaymentModal.jsx";

// import { useInvoices } from "../../hooks/useInvoices.js";
// import {
//   Alert,
//   Snackbar,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";

// const InvoicesPage = () => {
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [selectedPaymentInvoice, setSelectedPaymentInvoice] = useState(null);

//   const navigate = useNavigate();

//   const {
//     createManualPayment,
//     creatingPayment,
//     fetchInvoicePayments,
//     paymentSummary,
//     loadingInvoicePayments,

//   } = usePayments();

//   const handleRecordPayment = async (invoice) => {
//     try {
//       setSelectedPaymentInvoice(invoice);
//       setPaymentModalOpen(true);

//       await fetchInvoicePayments(invoice.id);
//     } catch (error) {
//       console.error(
//         "Failed to fetch invoice payment details:",
//         error
//       );
//     }
//   };

//   const handleClosePaymentModal = () => {
//     setPaymentModalOpen(false);
//     setSelectedPaymentInvoice(null);
//   };

//   const handleManualPaymentSubmit = async (paymentData) => {
//     try {
//       await createManualPayment(paymentData);

//       handleClosePaymentModal();

//       navigate("/payments");
//     } catch (error) {
//       console.error("Failed to record payment:", error);
//     }
//   };

//   const [paymentHistoryOpen, setPaymentHistoryOpen] =
//     useState(false);

//   const [paymentHistoryInvoice, setPaymentHistoryInvoice] =
//     useState(null);

//   const handlePaymentHistory = async (invoice) => {
//     try {
//       setPaymentHistoryInvoice(invoice);
//       setPaymentHistoryOpen(true);

//       await fetchInvoicePayments(invoice.id);
//     } catch (error) {
//       console.error(
//         "Failed to fetch payment history:",
//         error
//       );
//     }
//   };
//   const handleClosePaymentHistory = () => {
//     setPaymentHistoryOpen(false);
//     setPaymentHistoryInvoice(null);
//   };
//   const {
//     invoices,
//     loading,
//     page,
//     limit,
//     pagination,
//     search,
//     setPage,
//     setLimit,
//     handleSearchChange,
//     refreshInvoices,
//     dialogOpen,
//     dialogMode,

//     openCreateDialog,
//     openEditDialog,
//     closeDialog,

//     drawerOpen,
//     selectedInvoice,

//     openDrawer,
//     closeDrawer,

//     deleteOpen,
//     openDeleteDialog,
//     closeDeleteDialog,
//     deleteInvoice,
//     handleInvoicePdf,
//     handleSendInvoiceEmail,
//     toast,
//     handleCloseToast,
//   } = useInvoices();

//   // Delete Invoice (Temporary)
//   const handleDeleteInvoice = (invoice) => {
//     console.log("Delete:", invoice);
//   };



//   // Pagination
//   const handleRowsPerPageChange = (event) => {
//     setLimit(parseInt(event.target.value, 10));
//     setPage(1);
//   };

//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Box mb={4}>
//         <Typography
//           variant="h4"
//           fontWeight={700}
//         >
//           Invoices
//         </Typography>

//         <Typography
//           variant="body1"
//           color="text.secondary"
//         >
//           Create, manage and track all your invoices.
//         </Typography>
//       </Box>

//       {/* Summary Cards */}
//       {!loading && (
//         <Box mb={4}>
//           <InvoiceSummaryCards invoices={invoices} />
//         </Box>
//       )}

//       {/* Toolbar */}
//       <Box mb={4}>
//         <InvoiceToolbar
//           search={search}
//           onSearchChange={handleSearchChange}
//           onCreateInvoice={openCreateDialog}
//         />
//       </Box>

//       {/* Table / Skeleton / Empty */}
//       {loading ? (
//         <InvoiceSkeleton rows={limit} />
//       ) : invoices.length === 0 ? (
//         <InvoiceEmptyState
//           onAction={openCreateDialog}
//         />
//       ) : (
//         <InvoiceTable
//           invoices={invoices}
//           pagination={pagination}
//           page={page}
//           rowsPerPage={limit}
//           onPageChange={setPage}
//           onRowsPerPageChange={handleRowsPerPageChange}
//           onView={openDrawer}
//           onEdit={openEditDialog}
//           onDelete={openDeleteDialog}
//           onInvoicePdf={handleInvoicePdf}
//           onSendInvoiceEmail={handleSendInvoiceEmail}
//           onRecordPayment={handleRecordPayment}
//           onPaymentHistory={handlePaymentHistory}

//         />
//       )}

//       {/* Invoice Dialog */}
//       <InvoiceDialog
//         open={dialogOpen}
//         onClose={closeDialog}
//         onSuccess={refreshInvoices}
//         mode={dialogMode}
//         invoice={selectedInvoice}
//       />

//       {/* //side view  */}
//       <InvoiceDrawer
//         open={drawerOpen}
//         onClose={closeDrawer}
//         invoice={selectedInvoice}
//       />

//       {/* //delete dialog */}
//       <InvoiceDeleteDialog
//         open={deleteOpen}
//         invoice={selectedInvoice}
//         onClose={closeDeleteDialog}
//         onDelete={deleteInvoice}
//         loading={loading}
//       />
//       <ManualPaymentModal
//         open={paymentModalOpen}
//         invoice={selectedPaymentInvoice}
//         paymentSummary={paymentSummary}
//         onClose={handleClosePaymentModal}
//         onSubmit={handleManualPaymentSubmit}
//         loading={
//           creatingPayment ||
//           loadingInvoicePayments
//         }
//       />
//       <PaymentHistoryDrawer
//         open={paymentHistoryOpen}
//         onClose={handleClosePaymentHistory}
//         invoice={paymentHistoryInvoice}
//         payments={invoicePayments}
//         paymentSummary={paymentSummary}
//         loading={loadingInvoicePayments}
//       />

//       <Snackbar
//         open={toast.open}
//         autoHideDuration={4000}
//         onClose={handleCloseToast}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//       >

//         <Alert
//           onClose={handleCloseToast}
//           severity={toast.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default InvoicesPage;

import { useState } from "react";

import {
  Alert,
  Box,
  Snackbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import InvoiceSummaryCards from "../../components/invoices/InvoiceSummaryCards.jsx";
import InvoiceToolbar from "../../components/invoices/InvoiceToolbar.jsx";
import InvoiceTable from "../../components/invoices/InvoiceTable.jsx";
import InvoiceSkeleton from "../../components/invoices/InvoiceSkeleton.jsx";
import InvoiceEmptyState from "../../components/invoices/InvoiceEmptyState.jsx";
import InvoiceDialog from "../../components/invoices/InvoiceDialog.jsx";
import InvoiceDrawer from "../../components/invoices/InvoiceDrawer.jsx";
import InvoiceDeleteDialog from "../../components/invoices/InvoiceDeleteDialog.jsx";

import PaymentHistoryDrawer from "../../components/payments/PaymentHistoryDrawer.jsx";
import ManualPaymentModal from "../../components/payments/ManualPaymentModal.jsx";

import { useInvoices } from "../../hooks/useInvoices.js";
import usePayments from "../../hooks/usePayments.js";

const InvoicesPage = () => {
  /*
   * -----------------------------------------
   * Navigation
   * -----------------------------------------
   */

  const navigate = useNavigate();

  /*
   * -----------------------------------------
   * Payment state
   * -----------------------------------------
   */

  const [paymentModalOpen, setPaymentModalOpen] =
    useState(false);

  const [
    selectedPaymentInvoice,
    setSelectedPaymentInvoice,
  ] = useState(null);

  const [
    paymentHistoryOpen,
    setPaymentHistoryOpen,
  ] = useState(false);

  const [
    paymentHistoryInvoice,
    setPaymentHistoryInvoice,
  ] = useState(null);

  /*
   * -----------------------------------------
   * Payments hook
   * -----------------------------------------
   */

  const {
    createManualPayment,
    creatingPayment,
    fetchInvoicePayments,
    invoicePayments,
    paymentSummary,
    loadingInvoicePayments,
  } = usePayments();

  /*
   * -----------------------------------------
   * Record Payment
   * -----------------------------------------
   */

  const handleRecordPayment = async (invoice) => {
    try {
      setSelectedPaymentInvoice(invoice);
      setPaymentModalOpen(true);

      await fetchInvoicePayments(invoice.id);
    } catch (error) {
      console.error(
        "Failed to fetch invoice payment details:",
        error
      );
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedPaymentInvoice(null);
  };

  const handleManualPaymentSubmit = async (
    paymentData
  ) => {
    try {
      await createManualPayment(paymentData);

      handleClosePaymentModal();

      navigate("/payments");
    } catch (error) {
      console.error(
        "Failed to record payment:",
        error
      );
    }
  };

  /*
   * -----------------------------------------
   * Payment History
   * -----------------------------------------
   */

  const handlePaymentHistory = async (invoice) => {
    try {
      setPaymentHistoryInvoice(invoice);
      setPaymentHistoryOpen(true);

      await fetchInvoicePayments(invoice.id);
    } catch (error) {
      console.error(
        "Failed to fetch payment history:",
        error
      );
    }
  };

  const handleClosePaymentHistory = () => {
    setPaymentHistoryOpen(false);
    setPaymentHistoryInvoice(null);
  };

  /*
   * -----------------------------------------
   * Invoice hook
   * -----------------------------------------
   */

  const {
    invoices,
    loading,
    page,
    limit,
    pagination,
    search,
    setPage,
    setLimit,
    handleSearchChange,
    refreshInvoices,
    dialogOpen,
    dialogMode,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    drawerOpen,
    selectedInvoice,
    openDrawer,
    closeDrawer,
    deleteOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteInvoice,
    handleInvoicePdf,
    handleSendInvoiceEmail,
    toast,
    handleCloseToast,
  } = useInvoices();

  /*
   * -----------------------------------------
   * Pagination
   * -----------------------------------------
   */

  const handleRowsPerPageChange = (event) => {
    setLimit(
      parseInt(event.target.value, 10)
    );

    setPage(1);
  };

  return (
    <Box p={3}>

      {/* Header */}

      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Invoices
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Create, manage and track all your
          invoices.
        </Typography>
      </Box>

      {/* Summary Cards */}

      {!loading && (
        <Box mb={4}>
          <InvoiceSummaryCards
            invoices={invoices}
          />
        </Box>
      )}

      {/* Toolbar */}

      <Box mb={4}>
        <InvoiceToolbar
          search={search}
          onSearchChange={
            handleSearchChange
          }
          onCreateInvoice={
            openCreateDialog
          }
        />
      </Box>

      {/* Table / Skeleton / Empty */}

      {loading ? (
        <InvoiceSkeleton rows={limit} />
      ) : invoices.length === 0 ? (
        <InvoiceEmptyState
          onAction={openCreateDialog}
        />
      ) : (
        <InvoiceTable
          invoices={invoices}
          pagination={pagination}
          page={page}
          rowsPerPage={limit}
          onPageChange={setPage}
          onRowsPerPageChange={
            handleRowsPerPageChange
          }
          onView={openDrawer}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          onInvoicePdf={
            handleInvoicePdf
          }
          onSendInvoiceEmail={
            handleSendInvoiceEmail
          }
          onRecordPayment={
            handleRecordPayment
          }
          onPaymentHistory={
            handlePaymentHistory
          }
        />
      )}

      {/* Invoice Dialog */}

      <InvoiceDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSuccess={refreshInvoices}
        mode={dialogMode}
        invoice={selectedInvoice}
      />

      {/* Invoice Drawer */}

      <InvoiceDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        invoice={selectedInvoice}
      />

      {/* Delete Dialog */}

      <InvoiceDeleteDialog
        open={deleteOpen}
        invoice={selectedInvoice}
        onClose={closeDeleteDialog}
        onDelete={deleteInvoice}
        loading={loading}
      />

      {/* Manual Payment Modal */}

      <ManualPaymentModal
        open={paymentModalOpen}
        invoice={selectedPaymentInvoice}
        paymentSummary={paymentSummary}
        onClose={handleClosePaymentModal}
        onSubmit={handleManualPaymentSubmit}
        loading={
          creatingPayment ||
          loadingInvoicePayments
        }
      />

      {/* Payment History Drawer */}

      <PaymentHistoryDrawer
        open={paymentHistoryOpen}
        onClose={
          handleClosePaymentHistory
        }
        invoice={paymentHistoryInvoice}
        payments={invoicePayments}
        paymentSummary={paymentSummary}
        loading={loadingInvoicePayments}
      />

      {/* Toast */}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default InvoicesPage;