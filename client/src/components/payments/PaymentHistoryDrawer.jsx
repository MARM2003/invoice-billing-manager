import PropTypes from "prop-types";

import {
    Box,
    Chip,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { formatCurrency } from "../../utils/currency.js";
import { formatDate } from "../../utils/date.js";

const PaymentHistoryDrawer = ({
    open,
    onClose,
    invoice,
    payments = [],
    paymentSummary,
    loading = false,
}) => {
    const invoiceTotal = Number(
        invoice?.totalAmount || 0
    );

    const totalPaid = Number(
        paymentSummary?.totalPaid || 0
    );

    const outstandingAmount = Number(
        paymentSummary?.outstandingAmount ??
            invoiceTotal - totalPaid
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        sm: 450,
                        md: 500,
                    },
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Payment History
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {invoice?.invoiceNumber ||
                            "Invoice"}
                    </Typography>
                </Box>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider />

            {/* Content */}
            <Box
                sx={{
                    p: 3,
                    overflowY: "auto",
                    flex: 1,
                }}
            >
                {!invoice ? (
                    <Typography
                        color="text.secondary"
                        textAlign="center"
                    >
                        No invoice selected.
                    </Typography>
                ) : (
                    <Stack spacing={3}>
                        {/* Invoice information */}
                        <Box>
                            <Stack spacing={1.5}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Invoice
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        {
                                            invoice.invoiceNumber
                                        }
                                    </Typography>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Customer
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        textAlign="right"
                                    >
                                        {invoice.customer
                                            ?.name || "—"}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Payment summary */}
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                mb={1.5}
                            >
                                Payment Summary
                            </Typography>

                            <Stack spacing={1.5}>
                                <SummaryRow
                                    label="Invoice Total"
                                    value={formatCurrency(
                                        invoiceTotal
                                    )}
                                />

                                <SummaryRow
                                    label="Total Paid"
                                    value={formatCurrency(
                                        totalPaid
                                    )}
                                    valueColor="success.main"
                                />

                                <SummaryRow
                                    label="Outstanding"
                                    value={formatCurrency(
                                        outstandingAmount
                                    )}
                                    valueColor={
                                        outstandingAmount >
                                        0
                                            ? "warning.main"
                                            : "success.main"
                                    }
                                />
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Payment history */}
                        <Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={1.5}
                            >
                                <PaymentsOutlinedIcon
                                    fontSize="small"
                                />

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                >
                                    Payments
                                </Typography>
                            </Box>

                            {loading ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    py={5}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : payments.length === 0 ? (
                                <Box
                                    sx={{
                                        py: 5,
                                        textAlign: "center",
                                    }}
                                >
                                    <ReceiptLongOutlinedIcon
                                        sx={{
                                            fontSize: 45,
                                            color: "text.disabled",
                                            mb: 1,
                                        }}
                                    />

                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                    >
                                        No payments yet
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={0.5}
                                    >
                                        No payment has been
                                        recorded for this
                                        invoice.
                                    </Typography>
                                </Box>
                            ) : (
                                <List
                                    disablePadding
                                >
                                    {payments.map(
                                        (payment) => (
                                            <PaymentHistoryItem
                                                key={
                                                    payment.id
                                                }
                                                payment={
                                                    payment
                                                }
                                            />
                                        )
                                    )}
                                </List>
                            )}
                        </Box>
                    </Stack>
                )}
            </Box>
        </Drawer>
    );
};

/*
 * -----------------------------------------
 * Summary Row
 * -----------------------------------------
 */

const SummaryRow = ({
    label,
    value,
    valueColor = "text.primary",
}) => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
        >
            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={700}
                color={valueColor}
            >
                {value}
            </Typography>
        </Box>
    );
};

/*
 * -----------------------------------------
 * Payment History Item
 * -----------------------------------------
 */

const PaymentHistoryItem = ({ payment }) => {
    return (
        <ListItem
            disableGutters
            sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "divider",
                alignItems: "flex-start",
            }}
        >
            <ListItemText
                primary={
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                    >
                        <Typography
                            variant="body1"
                            fontWeight={700}
                        >
                            {formatCurrency(
                                payment.amount
                            )}
                        </Typography>

                        <Chip
                            label={
                                payment.status || "PAID"
                            }
                            size="small"
                            color={
                                payment.status ===
                                "PAID"
                                    ? "success"
                                    : payment.status ===
                                      "FAILED"
                                    ? "error"
                                    : "default"
                            }
                        />
                    </Box>
                }
                secondary={
                    <Stack spacing={0.5} mt={1}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {payment.method
                                ?.replace(
                                    "_",
                                    " "
                                )
                                .toUpperCase() ||
                                "—"}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {formatDate(
                                payment.paymentDate ||
                                    payment.createdAt
                            )}
                        </Typography>

                        {payment.transactionId && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Transaction ID:{" "}
                                {
                                    payment.transactionId
                                }
                            </Typography>
                        )}

                        {payment.reference && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Reference:{" "}
                                {payment.reference}
                            </Typography>
                        )}

                        {payment.notes && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Notes: {payment.notes}
                            </Typography>
                        )}
                    </Stack>
                }
            />
        </ListItem>
    );
};

SummaryRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    valueColor: PropTypes.string,
};

PaymentHistoryItem.propTypes = {
    payment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        status: PropTypes.string,
        method: PropTypes.string,
        paymentDate: PropTypes.string,
        createdAt: PropTypes.string,
        transactionId: PropTypes.string,
        reference: PropTypes.string,
        notes: PropTypes.string,
    }).isRequired,
};

PaymentHistoryDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    invoice: PropTypes.object,
    payments: PropTypes.array,
    paymentSummary: PropTypes.shape({
        totalPaid: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        outstandingAmount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }),
    loading: PropTypes.bool,
};

export default PaymentHistoryDrawer;