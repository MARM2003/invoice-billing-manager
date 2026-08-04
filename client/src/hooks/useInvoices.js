import { useCallback, useEffect, useState } from "react";
import { getInvoicesService, getInvoiceByIdService, deleteInvoiceService } from "../services/invoice.service.js";
import useDebounce from "./useDebounce.js";
import { toast } from "react-toastify";
export const useInvoices = () => {
  // Invoice data
  const [invoices, setInvoices] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openCreateDialog = () => {
    setSelectedInvoice(null);
    setDialogMode("create");
    setDialogOpen(true);
  };


  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedInvoice(null);
  };
  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);


  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  /**
   * Fetch invoices from backend
   */
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getInvoicesService({
        page,
        limit,
        search: debouncedSearch,
      });
      setInvoices(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  /**
   * Refresh invoice list
   */
  const refreshInvoices = () => {
    fetchInvoices();
  };

  /**
   * Fetch invoices on mount
   * and whenever page/search changes
   */
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const openDrawer = async (invoice) => {
    try {
      setLoading(true)
      const response = await getInvoiceByIdService(invoice.id)

      setSelectedInvoice(response.data)

      setDrawerOpen(true)

    } catch (error) {
      console.error("Failed to fetch invoices", error)

    } finally {
      setLoading(false)
    }
  };

  const closeDrawer = () => {
    setSelectedInvoice(null);
    setDrawerOpen(false);
  };


  //helper functions for edit dialog
  const openEditDialog = async (invoice) => {
    try {
      setLoading(true)

      const response = await getInvoiceByIdService(invoice.id)

      setSelectedInvoice(response.data)

      setDialogMode("edit");
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch invoice details.", error)
    } finally {
      setLoading(false)
    }
  }

  //helper functions for delete dialog
  const openDeleteDialog = (invoice) => {
    setSelectedInvoice(invoice);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedInvoice(null);
    setDeleteOpen(false);
  };

  const deleteInvoice = async () => {
    try {
      setLoading(true);

      const response = await deleteInvoiceService(selectedInvoice.id);

      if (response.success) {
        toast.success("Invoice deleted successfully.");

        closeDeleteDialog();

        await refreshInvoices();
      }
    } catch (error) {
      console.error("Failed to delete invoice:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete invoice."
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    // Data
    invoices,
    pagination,

    // UI
    loading,
    error,

    // Search
    search,
    handleSearchChange,

    // Pagination
    page,
    setPage,
    limit,

    // Actions
    fetchInvoices,
    refreshInvoices,

    // Dialog
    dialogOpen,
    dialogMode,
    openCreateDialog,
    openEditDialog,
    closeDialog,

    // Drawer
    drawerOpen,
    selectedInvoice,
    openDrawer,
    closeDrawer,

    //edit dialog
    openEditDialog,

    //delete 
    deleteOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteInvoice,
  };
};