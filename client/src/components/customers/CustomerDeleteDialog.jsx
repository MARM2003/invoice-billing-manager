import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const CustomerDeleteDialog = ({
    open,
    onClose,
    onDelete,
    customer,
    loading = false,
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                Delete Customer
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{" "}
                    <strong>{customer?.name}</strong>?
                </DialogContentText>

                <DialogContentText sx={{ mt: 2 }}>
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <LoadingButton
                    color="error"
                    variant="contained"
                    loading={loading}
                    onClick={() => onDelete(customer.id)}
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDeleteDialog;