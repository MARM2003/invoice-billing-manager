import PropTypes from "prop-types";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GeneralInfoSection from "./form/GeneralInfoSection.jsx";
import CustomerSection from "./form/CustomerSection.jsx";
import InvoiceItemsSection from "./form/InvoiceItemsSection.jsx";
import InvoiceTotalsSection from "./form/InvoiceTotalsSection.jsx";
import NotesSection from "./form/NotesSection.jsx";

import { invoiceSchema } from "../../validations/invoice.schema.js";

import useDebounce from "../../hooks/useDebounce.js";
import { getCustomersService } from "../../services/customer.service.js";

import { calculateInvoiceTotals } from "../../utils/invoiceCalculations.js"

import { createInvoiceService, updateInvoiceService } from "../../services/invoice.service.js";
import { toast } from "react-toastify";

const InvoiceDialog = ({
    open,
    onClose,
    onSuccess,
    mode,
    invoice,
}) => {
    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm({
        resolver: zodResolver(invoiceSchema),

        defaultValues: {
            customerId: "",
            issueDate: "",
            dueDate: "",
            status: "DRAFT",

            items: [
                {
                    description: "",
                    quantity: 1,
                    unitPrice: "",
                    taxRate: 0,
                },
            ],

            notes: "",
        },
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "items",
    });


    const [customerSearch, setCustomerSearch] = useState("");

    const [customers, setCustomers] = useState([]);

    const [loadingCustomers, setLoadingCustomers] = useState(false);

    const debouncedCustomerSearch = useDebounce(
        customerSearch,
        500
    );

    // to get the customers
    useEffect(() => {
        if (!debouncedCustomerSearch.trim()) {
            setCustomers([]);
        }
        const fetchCustomers = async () => {
            try {
                setLoadingCustomers(true);

                const response = await getCustomersService({
                    page: 1,
                    limit: 10,
                    search: debouncedCustomerSearch,
                });
                setCustomers(response.data.customers ?? []);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoadingCustomers(false);
            }
        };

        fetchCustomers();
    }, [debouncedCustomerSearch]);


    const items = watch("items");
    const { subtotal, tax, total } = calculateInvoiceTotals(items)

    // creating the invoice
    // const onSubmit = async (data) => {
    //     try {
    //         if (mode === "create") {

    //             const response = await createInvoiceService(data);
    //             if (response && response.success) {
    //                 toast.success("Invoice created successfully")
    //                 await onSuccess();
    //             }
    //         } else {
    //             const response = await updateInvoiceService(invoice.id, data);
    //             if (response && response.success) {
    //                 toast.success("Invoice updated successfully")
    //                 await onSuccess();
    //             }
    //         }
    //         onClose();
    //     } catch (error) {
    //         console.error("Failed to create invoice:", error);
    //         toast.error("Failed to create invoice" || error)
    //     }
    // };
    const onSubmit = async (data) => {
        try {
            const response =
                mode === "create"
                    ? await createInvoiceService(data)
                    : await updateInvoiceService(invoice.id, data);

            if (response?.success) {
                toast.success(
                    mode === "create"
                        ? "Invoice created successfully."
                        : "Invoice updated successfully."
                );

                await onSuccess();
                onClose();
            }
        } catch (error) {
            console.error(
                mode === "create"
                    ? "Failed to create invoice:"
                    : "Failed to update invoice:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                (mode === "create"
                    ? "Failed to create invoice."
                    : "Failed to update invoice.")
            );
        }
    };


    useEffect(() => {
        if (mode === "edit" && invoice) {
            console.log(invoice.customerId)
            reset({
                customerId: invoice.customerId,

                issueDate: invoice.issueDate
                    ? invoice.issueDate.split("T")[0]
                    : "",

                dueDate: invoice.dueDate
                    ? invoice.dueDate.split("T")[0]
                    : "",

                status: invoice.status,

                notes: invoice.notes || "",

                items: invoice.items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: Number(item.unitPrice),
                    taxRate: Number(item.taxRate),
                })),
            });
        }
    }, [mode, invoice, reset]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {mode === "edit" ? "Edit Invoice" : "Create Invoice"}
                </DialogTitle>

                <Divider />

                <DialogContent>
                    <Stack
                        spacing={4}
                        mt={2}
                    >
                        {/* General Information */}
                        <GeneralInfoSection control={control} />

                        {/* Customer */}
                        <Controller
                            name="customerId"
                            control={control}
                            render={({ field, fieldState }) => {
                                const selectedCustomer =
                                    customers.find((customer) => customer.id === field.value) || null;

                                return (
                                    <CustomerSection
                                        customers={customers}
                                        loading={loadingCustomers}
                                        value={selectedCustomer}
                                        inputValue={customerSearch}
                                        onInputChange={(_, value) => {
                                            setCustomerSearch(value);
                                        }}
                                        onChange={(_, customer) => {
                                            field.onChange(customer?.id ?? "");
                                        }}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                );
                            }}
                        />

                        {/* Invoice Items */}
                        <InvoiceItemsSection
                            control={control}
                            fields={fields}
                            append={append}
                            remove={remove}
                        />

                        {/* Totals */}
                        <InvoiceTotalsSection
                            subtotal={subtotal}
                            tax={tax}
                            total={total}
                        />

                        {/* Notes */}
                        <NotesSection control={control} />
                    </Stack>
                </DialogContent>

                <Divider />

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        color="inherit"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                    >
                        {mode === "edit" ? "Update Invoice" : "Save Invoice"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

InvoiceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default InvoiceDialog;