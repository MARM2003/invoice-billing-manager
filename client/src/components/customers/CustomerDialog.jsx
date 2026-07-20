import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import CustomerForm from "./CustomerForm";

const CustomerDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  mode = "add",
  initialValues = {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {mode === "add"
          ? "Add Customer"
          : "Edit Customer"}
      </DialogTitle>

      <CustomerForm
        defaultValues={initialValues}
        onSubmit={onSubmit}
      />

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          form="customer-form"
          variant="contained"
          loading={loading}
        >
          {mode === "add"
            ? "Save Customer"
            : "Update Customer"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDialog;