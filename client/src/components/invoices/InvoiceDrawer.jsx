import PropTypes from "prop-types";

import {
    Box,
    Chip,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import InvoiceStatusChip from "./InvoiceStatusChip.jsx";

const InfoRow = ({ label, value }) => (
    <ListItem disableGutters>
        <ListItemText
            primary={label}
            secondary={value || "-"}
            primaryTypographyProps={{
                fontWeight: 600,
                color: "text.secondary",
            }}
            secondaryTypographyProps={{
                color: "text.primary",
            }}
        />
    </ListItem>
);

InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

const InvoiceDrawer = ({
    open,
    onClose,
    invoice,
}) => {
    if (!invoice) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: {
                        xs: "100vw",
                        sm: 500,
                    },
                    p: 3,
                }}
            >
                {/* Header */}
                <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                >
                    {invoice.invoiceNumber}
                </Typography>

                <InvoiceStatusChip
                    status={invoice.status}
                />

                <Divider sx={{ my: 3 }} />

                {/* Invoice Details */}
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Invoice Details
                </Typography>

                <List dense>
                    <InfoRow
                        label="Customer"
                        value={invoice.customer?.name}
                    />

                    <InfoRow
                        label="Company"
                        value={invoice.customer?.companyName}
                    />

                    <InfoRow
                        label="Email"
                        value={invoice.customer?.email}
                    />

                    <InfoRow
                        label="Issue Date"
                        value={formatDate(invoice.issueDate)}
                    />

                    <InfoRow
                        label="Due Date"
                        value={formatDate(invoice.dueDate)}
                    />
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Items */}
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Invoice Items
                </Typography>

                <Paper
                    variant="outlined"
                    sx={{ overflow: "hidden" }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell align="center">
                                    Qty
                                </TableCell>
                                <TableCell align="right">
                                    Price
                                </TableCell>
                                <TableCell align="right">
                                    Tax %
                                </TableCell>
                                <TableCell align="right">
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {invoice.items?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>

                                    <TableCell align="center">
                                        {item.quantity}
                                    </TableCell>

                                    <TableCell align="right">
                                        {formatCurrency(item.unitPrice)}
                                    </TableCell>

                                    <TableCell align="right">
                                        {item.taxRate}%
                                    </TableCell>

                                    <TableCell align="right">
                                        {formatCurrency(item.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <Divider sx={{ my: 3 }} />

                {/* Summary */}
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Summary
                </Typography>

                <Stack spacing={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography color="text.secondary">
                            Subtotal
                        </Typography>

                        <Typography>
                            {formatCurrency(invoice.subtotal)}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography color="text.secondary">
                            Tax
                        </Typography>

                        <Typography>
                            {formatCurrency(invoice.taxAmount)}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography color="text.secondary">
                            Discount
                        </Typography>

                        <Typography>
                            {formatCurrency(invoice.discountAmount)}
                        </Typography>
                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography
                            fontWeight={700}
                        >
                            Grand Total
                        </Typography>

                        <Typography
                            fontWeight={700}
                        >
                            {formatCurrency(invoice.totalAmount)}
                        </Typography>
                    </Stack>
                </Stack>

                {!!invoice.notes && (
                    <>
                        <Divider sx={{ my: 3 }} />

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Notes
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                bgcolor: "grey.50",
                            }}
                        >
                            <Typography>
                                {invoice.notes}
                            </Typography>
                        </Paper>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

InvoiceDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    invoice: PropTypes.object,
};

InvoiceDrawer.defaultProps = {
    invoice: null,
};

export default InvoiceDrawer;