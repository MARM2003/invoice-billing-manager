import PropTypes from "prop-types";

import {
    Chip,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";

import { formatCurrency } from "../../utils/currency.js";
import { formatDate } from "../../utils/date.js";

const TABLE_COLUMNS = [
    "Payment Date",
    "Invoice",
    "Customer",
    "Amount",
    "Method",
    "Status",
    "Transaction ID",
];

const PaymentTable = ({
    payments,
    pagination,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}) => {
    return (
        <Paper elevation={2}>
            <TableContainer
                sx={{
                    overflowX: "auto",
                }}
            >
                <Table size="small">

                    <TableHead>
                        <TableRow>
                            {TABLE_COLUMNS.map(
                                (column) => (
                                    <TableCell
                                        key={column}
                                        align={
                                            column ===
                                                "Amount"
                                                ? "right"
                                                : "left"
                                        }
                                        sx={{
                                            fontWeight: 600,
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {column}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {payments.map(
                            (payment) => (
                                <TableRow
                                    key={payment.id}
                                    hover
                                >
                                    {/* Payment Date */}

                                    <TableCell
                                        sx={{
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {formatDate(
                                            payment.paymentDate ||
                                            payment.createdAt
                                        )}
                                    </TableCell>

                                    {/* Invoice */}

                                    <TableCell>
                                        <Typography
                                            fontWeight={
                                                600
                                            }
                                        >
                                            {payment.invoice
                                                ?.invoiceNumber ||
                                                "-"}
                                        </Typography>
                                    </TableCell>

                                    {/* Customer */}

                                    <TableCell>
                                        {payment.customer
                                            ?.name ||
                                            "-"}
                                    </TableCell>

                                    {/* Amount */}

                                    <TableCell align="right">
                                        <Typography
                                            fontWeight={
                                                600
                                            }
                                        >
                                            {formatCurrency(
                                                payment.amount
                                            )}
                                        </Typography>
                                    </TableCell>

                                    {/* Method */}

                                    <TableCell>
                                        <Chip
                                            size="small"
                                            variant="outlined"
                                            label={formatMethod(
                                                payment.method
                                            )}
                                        />
                                    </TableCell>

                                    {/* Status */}

                                    <TableCell>
                                        <PaymentStatusChip
                                            status={
                                                payment.status
                                            }
                                        />
                                    </TableCell>

                                    {/* Transaction ID */}

                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                maxWidth: 180,
                                                overflow:
                                                    "hidden",
                                                textOverflow:
                                                    "ellipsis",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {payment.transactionId ||
                                                "-"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={pagination.totalPayments || 0}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={(
                    _,
                    newPage
                ) =>
                    onPageChange(
                        newPage + 1
                    )
                }
                onRowsPerPageChange={
                    onRowsPerPageChange
                }
                rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                ]}
            />
        </Paper>
    );
};

/*
 * -----------------------------------------
 * Payment Status
 * -----------------------------------------
 */

const PaymentStatusChip = ({
    status,
}) => {
    const statusConfig = {
        PAID: {
            label: "Paid",
            color: "success",
        },
        PENDING: {
            label: "Pending",
            color: "warning",
        },
        FAILED: {
            label: "Failed",
            color: "error",
        },
        REFUNDED: {
            label: "Refunded",
            color: "default",
        },
    };

    const config =
        statusConfig[status] || {
            label: status || "Unknown",
            color: "default",
        };

    return (
        <Chip
            size="small"
            label={config.label}
            color={config.color}
        />
    );
};

/*
 * -----------------------------------------
 * Payment Method Formatter
 * -----------------------------------------
 */

const formatMethod = (method) => {
    if (!method) {
        return "-";
    }

    const labels = {
        STRIPE: "Stripe",
        CASH: "Cash",
        UPI: "UPI",
        BANK_TRANSFER: "Bank Transfer",
        CARD: "Card",
        OTHER: "Other",
    };

    return labels[method] || method;
};

PaymentStatusChip.propTypes = {
    status: PropTypes.string,
};

PaymentTable.propTypes = {
    payments: PropTypes.array.isRequired,
    pagination: PropTypes.shape({
        totalItems: PropTypes.number.isRequired,
        totalPages: PropTypes.number,
    }).isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange:
        PropTypes.func.isRequired,
};

export default PaymentTable;