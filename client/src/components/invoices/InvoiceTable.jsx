import PropTypes from "prop-types";
import {
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EmailIcon from "@mui/icons-material/Email";
import InvoiceStatusChip from "./InvoiceStatusChip.jsx";
import { formatCurrency } from "../../utils/currency.js";
import { formatDate } from "../../utils/date.js";

const TABLE_COLUMNS = [
    "Invoice #",
    "Customer",
    "Issue Date",
    "Due Date",
    "Status",
    "Amount",
    "Actions",
];

const InvoiceTable = ({
    invoices,
    pagination,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onView,
    onEdit,
    onDelete,
    onInvoicePdf,
    onSendInvoiceEmail
}) => {
    return (
        <Paper elevation={2}>
            <TableContainer sx={{ overflowX: "auto" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {TABLE_COLUMNS.map((column) => (
                                <TableCell
                                    key={column}
                                    align={
                                        column === "Amount"
                                            ? "right"
                                            : column === "Actions"
                                                ? "center"
                                                : "left"
                                    }
                                    sx={{ fontWeight: 600 }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow
                                key={invoice.id}
                                hover
                            >
                                <TableCell>
                                    <Typography fontWeight={600}>
                                        {invoice.invoiceNumber}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {invoice.customer?.name || "-"}
                                </TableCell>

                                <TableCell>
                                    {formatDate(invoice.issueDate)}
                                </TableCell>

                                <TableCell>
                                    {formatDate(invoice.dueDate)}
                                </TableCell>

                                <TableCell>
                                    <InvoiceStatusChip status={invoice.status} />
                                </TableCell>

                                <TableCell align="right">
                                    {formatCurrency(invoice.totalAmount)}
                                </TableCell>

                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        justifyContent="center"
                                    >
                                        <Tooltip title="View Invoice">
                                            <IconButton
                                                color="primary"
                                                onClick={() => onView(invoice)}
                                            >
                                                <VisibilityOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <IconButton
                                            size="small"
                                            onClick={() => onInvoicePdf(invoice.id)}
                                            title="Preview Invoice PDF"
                                        >
                                            <PictureAsPdfIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => onSendInvoiceEmail(invoice.id)}
                                            title="Send Invoice"
                                        >
                                            <EmailIcon fontSize="small" />
                                        </IconButton>
                                        <Tooltip title="Edit Invoice">
                                            <IconButton
                                                color="warning"
                                                onClick={() => onEdit(invoice)}
                                            >
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete Invoice">
                                            <IconButton
                                                color="error"
                                                onClick={() => onDelete(invoice)}
                                            >
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={pagination.totalInvoices}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => onPageChange(newPage + 1)}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </Paper>
    );
};

InvoiceTable.propTypes = {
    invoices: PropTypes.array.isRequired,

    pagination: PropTypes.shape({
        totalItems: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
    }).isRequired,

    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,

    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,

    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default InvoiceTable;