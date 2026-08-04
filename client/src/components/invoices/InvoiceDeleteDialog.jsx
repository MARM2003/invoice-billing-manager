import PropTypes from "prop-types"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const InvoiceDeleteDialog = ({
    open,
    onClose,
    onDelete,
    invoice,
    loading = false,
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            disableEscapeKeyDown={loading}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                Delete Invoice?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this invoice ?
                </DialogContentText>

                <DialogContentText sx={{ mt: 2 }}>
                    <strong>Invoice:</strong> {invoice?.invoiceNumber}
                </DialogContentText>

                <DialogContentText>
                    <strong>Customer:</strong>{" "}
                    {invoice?.customer?.name ||
                        invoice?.customer?.companyName ||
                        "-"}
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
                    onClick={() => onDelete(invoice?.id)}

                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

InvoiceDeleteDialog.defaultProps = {
    invoice: null,
    loading: false,
};

InvoiceDeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    invoice: PropTypes.object,
    loading: PropTypes.bool,
};

export default InvoiceDeleteDialog;