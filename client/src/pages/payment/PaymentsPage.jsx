import { Box, Typography } from "@mui/material";

import PaymentToolbar from "../../components/payments/PaymentToolbar.jsx";
import PaymentTable from "../../components/payments/PaymentTable.jsx";
import PaymentSkeleton from "../../components/payments/PaymentSkeleton.jsx";
import PaymentEmptyState from "../../components/payments/PaymentEmptyState.jsx";

import usePayments from "../../hooks/usePayments.js";

const PaymentsPage = () => {
    const {
        payments,
        loading,
        page,
        limit,
        pagination,
        search,
        status,
        method,
        startDate,
        endDate,
        setPage,
        setLimit,
        setSearch,
        setStatus,
        setMethod,
        setStartDate,
        setEndDate,
        clearFilters,
    } = usePayments();

    const handleRowsPerPageChange = (event) => {
        setLimit(
            parseInt(event.target.value, 10)
        );

        setPage(1);
    };

    return (
        <Box p={3}>
            {/* Header */}

            <Box mb={4}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Payments
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    View and track all recorded
                    payments.
                </Typography>
            </Box>

            {/* Filters */}

            <Box mb={3}>
                <PaymentToolbar
                    search={search}
                    status={status}
                    method={method}
                    startDate={startDate}
                    endDate={endDate}
                    onSearchChange={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                    onStatusChange={(value) => {
                        setStatus(value);
                        setPage(1);
                    }}
                    onMethodChange={(value) => {
                        setMethod(value);
                        setPage(1);
                    }}
                    onStartDateChange={(value) => {
                        setStartDate(value);
                        setPage(1);
                    }}
                    onEndDateChange={(value) => {
                        setEndDate(value);
                        setPage(1);
                    }}
                    onClearFilters={() => {
                        clearFilters();
                        setPage(1);
                    }}
                />
            </Box>

            {/* Payment Content */}

            {loading ? (
                <PaymentSkeleton rows={limit} />
            ) : payments.length === 0 ? (
                <PaymentEmptyState
                    hasFilters={
                        Boolean(search) ||
                        Boolean(status) ||
                        Boolean(method) ||
                        Boolean(startDate) ||
                        Boolean(endDate)
                    }
                    onClearFilters={clearFilters}
                />
            ) : (
                <PaymentTable
                    payments={payments}
                    pagination={pagination}
                    page={page}
                    rowsPerPage={limit}
                    onPageChange={setPage}
                    onRowsPerPageChange={
                        handleRowsPerPageChange
                    }
                />
            )}
        </Box>
    );
};

export default PaymentsPage;