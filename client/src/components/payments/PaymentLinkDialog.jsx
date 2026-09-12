import PropTypes from "prop-types";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const PaymentLinkDialog = ({
    open,
    onClose,
    invoice,
    paymentLink,
    onCopyLink,
    onCopyMessage,
    copiedLink,
    copiedMessage,
}) => {
    if (!invoice) {
        return null;
    }

    const customerName = invoice.customer?.name || "Customer";

    const message = `Hi ${customerName},

Your invoice ${invoice.invoiceNumber} for ${invoice.totalAmount} is ready for payment.

You can make the payment securely using the link below:

${paymentLink}

Thank you.`;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Payment Link
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} mt={1}>
                    <Alert
                        severity="success"
                        icon={<DoneOutlinedIcon />}
                    >
                        Payment link generated successfully.
                    </Alert>

                    <Stack spacing={1}>
                        <Typography
                            variant="subtitle2"
                            fontWeight={600}
                        >
                            Invoice
                        </Typography>

                        <Typography variant="body2">
                            {invoice.invoiceNumber}
                        </Typography>
                    </Stack>

                    <TextField
                        fullWidth
                        label="Payment Link"
                        value={paymentLink}
                        slotProps={{
                            input: {
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onCopyLink}
                                            edge="end"
                                            color={
                                                copiedLink
                                                    ? "success"
                                                    : "primary"
                                            }
                                        >
                                            <ContentCopyOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        variant="outlined"
                        startIcon={<ContentCopyOutlinedIcon />}
                        onClick={() => onCopyMessage(message)}
                        fullWidth
                    >
                        {copiedMessage
                            ? "Message Copied"
                            : "Copy Payment Message"}
                    </Button>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PaymentLinkDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    invoice: PropTypes.object,
    paymentLink: PropTypes.string,
    onCopyLink: PropTypes.func.isRequired,
    onCopyMessage: PropTypes.func.isRequired,
    copiedLink: PropTypes.bool.isRequired,
    copiedMessage: PropTypes.bool.isRequired,
};

PaymentLinkDialog.defaultProps = {
    invoice: null,
    paymentLink: "",
};

export default PaymentLinkDialog;