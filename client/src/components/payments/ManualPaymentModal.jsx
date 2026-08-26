import { useEffect, useMemo } from "react";

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createManualPaymentSchema } from "../../validations/payment.validation.js";

const defaultValues = {
    amount: "",
    method: "",
    transactionId: "",
    reference: "",
    notes: "",
};

const ManualPaymentModal = ({
    open,
    invoice,
    paymentSummary,
    onClose,
    onSubmit,
    loading = false,
}) => {
    const theme = useTheme();

    const fullScreen = useMediaQuery(
        theme.breakpoints.down("sm")
    );

    /*
     * -----------------------------------------
     * Payment calculations
     * -----------------------------------------
     */

    const invoiceTotal = Number(
        invoice?.totalAmount || 0
    );

    const totalPaid = Number(
        paymentSummary?.totalPaid ?? 0
    );

    const outstandingAmount = Number(
        paymentSummary?.outstandingAmount ?? invoiceTotal
    );

    /*
     * -----------------------------------------
     * Dynamic validation schema
     * -----------------------------------------
     *
     * The outstanding amount is different
     * for every invoice, so the Zod schema
     * must be created dynamically.
     */

    const paymentSchema = useMemo(
        () =>
            createManualPaymentSchema(
                outstandingAmount
            ),
        [outstandingAmount]
    );

    /*
     * -----------------------------------------
     * React Hook Form
     * -----------------------------------------
     */

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues,
    });

    /*
     * -----------------------------------------
     * Reset form when modal opens
     * -----------------------------------------
     */

    useEffect(() => {
        if (open) {
            reset(defaultValues);
        }
    }, [open, reset]);

    /*
     * -----------------------------------------
     * Submit payment
     * -----------------------------------------
     */

    const handleFormSubmit = async (data) => {
        const payload = {
            amount: Number(data.amount),
            method: data.method,
            transactionId:
                data.transactionId || undefined,
            reference:
                data.reference || undefined,
            notes:
                data.notes || undefined,

            invoiceId: invoice?.id,
            customerId: invoice?.customerId,
        };

        await onSubmit(payload);
    };

    /*
     * -----------------------------------------
     * Don't render without invoice
     * -----------------------------------------
     */

    if (!invoice) {
        return null;
    }

    const isLoading = loading || isSubmitting;

    return (
        <Dialog
            open={open}
            onClose={
                isLoading
                    ? undefined
                    : onClose
            }
            fullWidth
            maxWidth="sm"
            fullScreen={fullScreen}
        >
            <DialogTitle>
                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Record Payment
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Record a manual payment for this
                    invoice.
                </Typography>
            </DialogTitle>

            <Divider />

            <DialogContent>
                <Box
                    component="form"
                    id="manual-payment-form"
                    onSubmit={handleSubmit(
                        handleFormSubmit
                    )}
                    sx={{
                        pt: 2,
                    }}
                >
                    <Stack spacing={2.5}>

                        {/* --------------------------------
                            Invoice Information
                        --------------------------------- */}

                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor:
                                    "background.default",
                            }}
                        >
                            <Stack spacing={1}>

                                {/* Invoice */}

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
                                        textAlign="right"
                                    >
                                        {
                                            invoice.invoiceNumber
                                        }
                                    </Typography>
                                </Box>

                                {/* Customer */}

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
                                            ?.name ||
                                            invoice.customerName ||
                                            "—"}
                                    </Typography>
                                </Box>

                                <Divider />

                                {/* Invoice Total */}

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Invoice Total
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        ₹
                                        {invoiceTotal.toFixed(
                                            2
                                        )}
                                    </Typography>
                                </Box>

                                {/* Total Paid */}

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Total Paid
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        color="success.main"
                                    >
                                        ₹
                                        {totalPaid.toFixed(
                                            2
                                        )}
                                    </Typography>
                                </Box>

                                {/* Outstanding */}

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Outstanding
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        color="warning.main"
                                    >
                                        ₹
                                        {outstandingAmount.toFixed(
                                            2
                                        )}
                                    </Typography>
                                </Box>

                            </Stack>
                        </Box>

                        {/* --------------------------------
                            Payment Amount
                        --------------------------------- */}

                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    required
                                    label="Payment Amount"
                                    placeholder="Enter payment amount"
                                    type="number"
                                    error={Boolean(
                                        errors.amount
                                    )}
                                    helperText={
                                        errors.amount
                                            ?.message
                                    }
                                    inputProps={{
                                        min: 0.01,
                                        max: outstandingAmount,
                                        step: "0.01",
                                    }}
                                />
                            )}
                        />

                        {/* --------------------------------
                            Payment Method
                        --------------------------------- */}

                        <Controller
                            name="method"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                    required
                                    error={Boolean(
                                        errors.method
                                    )}
                                >
                                    <InputLabel>
                                        Payment Method
                                    </InputLabel>

                                    <Select
                                        {...field}
                                        label="Payment Method"
                                    >
                                        <MenuItem value="CASH">
                                            Cash
                                        </MenuItem>

                                        <MenuItem value="UPI">
                                            UPI
                                        </MenuItem>

                                        <MenuItem value="BANK_TRANSFER">
                                            Bank Transfer
                                        </MenuItem>

                                        <MenuItem value="CARD">
                                            Card
                                        </MenuItem>

                                        <MenuItem value="OTHER">
                                            Other
                                        </MenuItem>
                                    </Select>

                                    {errors.method && (
                                        <Typography
                                            variant="caption"
                                            color="error"
                                            sx={{
                                                ml: 1.75,
                                                mt: 0.5,
                                            }}
                                        >
                                            {
                                                errors
                                                    .method
                                                    .message
                                            }
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        />

                        {/* --------------------------------
                            Transaction ID
                        --------------------------------- */}

                        <Controller
                            name="transactionId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Transaction ID"
                                    placeholder="e.g. UPI transaction ID"
                                    error={Boolean(
                                        errors.transactionId
                                    )}
                                    helperText={
                                        errors
                                            .transactionId
                                            ?.message
                                    }
                                />
                            )}
                        />

                        {/* --------------------------------
                            Reference
                        --------------------------------- */}

                        <Controller
                            name="reference"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Reference"
                                    placeholder="Payment reference"
                                    error={Boolean(
                                        errors.reference
                                    )}
                                    helperText={
                                        errors.reference
                                            ?.message
                                    }
                                />
                            )}
                        />

                        {/* --------------------------------
                            Notes
                        --------------------------------- */}

                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label="Notes"
                                    placeholder="Additional payment notes"
                                    error={Boolean(
                                        errors.notes
                                    )}
                                    helperText={
                                        errors.notes
                                            ?.message
                                    }
                                />
                            )}
                        />

                    </Stack>
                </Box>
            </DialogContent>

            {/* --------------------------------
                Actions
            --------------------------------- */}

            <DialogActions
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                    },
                    pb: {
                        xs: 2,
                        sm: 2.5,
                    },
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    form="manual-payment-form"
                    variant="contained"
                    disabled={
                        isLoading ||
                        outstandingAmount <= 0
                    }
                >
                    {isLoading ? (
                        <CircularProgress
                            size={22}
                            color="inherit"
                        />
                    ) : (
                        "Record Payment"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ManualPaymentModal;