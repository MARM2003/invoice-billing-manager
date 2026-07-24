import { Box, Stack } from "@mui/material";

import CustomerHeader from "../../components/customers/CustomerHeader";
import CustomerToolbar from "../../components/customers/CustomerToolbar";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerDialog from "../../components/customers/CustomerDialog";
import CustomerDrawer from "../../components/customers/CustomerDrawer";
import CustomerDeleteDialog from "../../components/customers/CustomerDeleteDialog";

import useCustomers from "../../hooks/useCustomers"


const CustomersPage = () => {
  const {
    customers,
    loading,

    search,
    setSearch,

    paginationModel,
    setPaginationModel,

    totalCustomers,

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

    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  return (
    <Box>
      <Stack spacing={3}>
        <CustomerHeader
          onAddCustomer={openCreateDialog}
        />

        <CustomerToolbar
          search={search}
          onSearchChange={setSearch}
        />

        <CustomerTable
          customers={customers}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={
            setPaginationModel
          }
          rowCount={totalCustomers}
          onView={openDrawer}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />

        <CustomerDialog
          open={dialogOpen}
          onClose={closeDialog}
          onSubmit={
            selectedCustomer
              ? updateCustomer
              : createCustomer
          }
          initialValues={selectedCustomer}
          mode={
            selectedCustomer ? "edit" : "add"
          }
        />

        <CustomerDrawer
          open={drawerOpen}
          customer={selectedCustomer}
          onClose={closeDrawer}
        />

        <CustomerDeleteDialog
          open={deleteOpen}
          customer={selectedCustomer}
          onClose={closeDeleteDialog}
          onDelete={deleteCustomer}
        />
      </Stack>
    </Box>
  );
};

export default CustomersPage;