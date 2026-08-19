import { useState } from "react";
import { Box, Typography } from "@mui/material";

import InvoiceSummaryCards from "../../components/invoices/InvoiceSummaryCards.jsx";
import InvoiceToolbar from "../../components/invoices/InvoiceToolbar.jsx";
import InvoiceTable from "../../components/invoices/InvoiceTable.jsx";
import InvoiceSkeleton from "../../components/invoices/InvoiceSkeleton.jsx";
import InvoiceEmptyState from "../../components/invoices/InvoiceEmptyState.jsx";
import InvoiceDialog from "../../components/invoices/InvoiceDialog.jsx";
import InvoiceDrawer from "../../components/invoices/InvoiceDrawer.jsx";
import InvoiceDeleteDialog from "../../components/invoices/InvoiceDeleteDialog.jsx";
import { useInvoices } from "../../hooks/useInvoices.js";

const InvoicesPage = () => {
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
  } = useInvoices();

  // Delete Invoice (Temporary)
  const handleDeleteInvoice = (invoice) => {
    console.log("Delete:", invoice);
  };



  // Pagination
  const handleRowsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
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
          Create, manage and track all your invoices.
        </Typography>
      </Box>

      {/* Summary Cards */}
      {!loading && (
        <Box mb={4}>
          <InvoiceSummaryCards invoices={invoices} />
        </Box>
      )}

      {/* Toolbar */}
      <Box mb={4}>
        <InvoiceToolbar
          search={search}
          onSearchChange={handleSearchChange}
          onCreateInvoice={openCreateDialog}
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
          onRowsPerPageChange={handleRowsPerPageChange}
          onView={openDrawer}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          onInvoicePdf={handleInvoicePdf}
          onSendInvoiceEmail={handleSendInvoiceEmail}
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

      {/* //side view  */}
      <InvoiceDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        invoice={selectedInvoice}
      />

      {/* //delete dialog */}
      <InvoiceDeleteDialog
        open={deleteOpen}
        invoice={selectedInvoice}
        onClose={closeDeleteDialog}
        onDelete={deleteInvoice}
        loading={loading}
      />
    </Box>
  );
};

export default InvoicesPage;