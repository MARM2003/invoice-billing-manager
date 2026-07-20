import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCustomersService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer.service";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mutationLoading, setMutationLoading] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCustomersService({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search,
      });

      setCustomers(response.data.customers);
      setTotalCustomers(response.data.pagination.totalCustomers);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, search]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const openCreateDialog = () => {
    setSelectedCustomer(null);
    setDialogOpen(true);
  };

  const openEditDialog = (customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedCustomer(null);
  };

  const openDrawer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCustomer(null);
  };

  const openDeleteDialog = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    setSelectedCustomer(null);
  };

  const createCustomer = async (customerData) => {
    try {
      setMutationLoading((prev) => ({
        ...prev,
        create: true,
      }));

      await createCustomerService(customerData);

      toast.success("Customer created successfully.");

      closeDialog();

      await fetchCustomers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create customer."
      );
    } finally {
      setMutationLoading((prev) => ({
        ...prev,
        create: false,
      }));
    }
  };

  const updateCustomer = async (customerData) => {
    try {
      setMutationLoading((prev) => ({
        ...prev,
        update: true,
      }));
      console.log(customerData);
      await updateCustomerService(
        selectedCustomer.id,
        customerData
      );

      toast.success("Customer updated successfully.");

      closeDialog();

      await fetchCustomers();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update customer."
      );
    } finally {
      setMutationLoading((prev) => ({
        ...prev,
        update: false,
      }));
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      setMutationLoading((prev) => ({
        ...prev,
        delete: true,
      }));

      await deleteCustomerService(customerId);

      toast.success("Customer deleted successfully.");

      closeDeleteDialog();

      await fetchCustomers();
      closeDialog();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete customer."
      );
    } finally {
      setMutationLoading((prev) => ({
        ...prev,
        delete: false,
      }));
    }
  };

  return {
    customers,
    loading,

    search,
    setSearch,

    paginationModel,
    setPaginationModel,

    totalCustomers,

    fetchCustomers,

    dialogOpen,
    drawerOpen,
    deleteOpen,

    selectedCustomer,

    openCreateDialog,
    openEditDialog,
    closeDialog,

    openDrawer,
    closeDrawer,

    openDeleteDialog,
    closeDeleteDialog,

    mutationLoading,

    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;