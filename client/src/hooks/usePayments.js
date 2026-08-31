import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    createManualPaymentService,
    getPaymentsService,
    getPaymentByIdService,
    getInvoicePaymentsService,
} from "../services/payment.service.js";

const usePayments = () => {
    // =========================================================
    // Payment list state
    // =========================================================

    const [payments, setPayments] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPayments: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    // =========================================================
    // Payment list filters
    // =========================================================

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [method, setMethod] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // =========================================================
    // Individual payment state
    // =========================================================

    const [payment, setPayment] = useState(null);

    // =========================================================
    // Invoice payment history
    // =========================================================

    const [invoicePayments, setInvoicePayments] =
        useState([]);

    const [paymentSummary, setPaymentSummary] =
        useState({
            totalPaid: 0,
            outstandingAmount: 0,
        });

    // =========================================================
    // Loading states
    // =========================================================

    const [loading, setLoading] = useState(false);

    const [creatingPayment, setCreatingPayment] =
        useState(false);

    const [loadingPayment, setLoadingPayment] =
        useState(false);

    const [
        loadingInvoicePayments,
        setLoadingInvoicePayments,
    ] = useState(false);

    // =========================================================
    // Error state
    // =========================================================

    const [error, setError] = useState(null);

    // =========================================================
    // Create manual payment
    // =========================================================

    const createManualPayment = useCallback(
        async (paymentData) => {
            try {
                setCreatingPayment(true);
                setError(null);

                const response =
                    await createManualPaymentService(
                        paymentData
                    );

                return response;
            } catch (error) {
                console.error(
                    "Failed to create manual payment:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to record payment"
                );

                throw error;
            } finally {
                setCreatingPayment(false);
            }
        },
        []
    );

    // =========================================================
    // Get payments
    // =========================================================

    const fetchPayments = useCallback(
        async ({
            page: requestedPage = 1,
            limit: requestedLimit = 10,
            search: requestedSearch = "",
            status: requestedStatus,
            method: requestedMethod,
            startDate: requestedStartDate,
            endDate: requestedEndDate,
        } = {}) => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await getPaymentsService({
                        page: requestedPage,
                        limit: requestedLimit,
                        search: requestedSearch,
                        status: requestedStatus,
                        method: requestedMethod,
                        startDate: requestedStartDate,
                        endDate: requestedEndDate,
                    });

                const data = response?.data;

                setPayments(
                    data?.payments ?? []
                );

                setPagination(
                    data?.pagination ?? {
                        page: requestedPage,
                        limit: requestedLimit,
                        totalPayments: 0,
                        totalPages: 0,
                        hasNextPage: false,
                        hasPreviousPage: false,
                    }
                );

                return response;
            } catch (error) {
                console.error(
                    "Failed to fetch payments:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to fetch payments"
                );

                setPayments([]);

                throw error;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // =========================================================
    // Automatically fetch payments
    // whenever pagination or filters change
    // =========================================================

    useEffect(() => {
        fetchPayments({
            page,
            limit,
            search,
            status: status || undefined,
            method: method || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        });
    }, [
        page,
        limit,
        search,
        status,
        method,
        startDate,
        endDate,
        fetchPayments,
    ]);

    // =========================================================
    // Clear payment filters
    // =========================================================

    const clearFilters = useCallback(() => {
        setSearch("");
        setStatus("");
        setMethod("");
        setStartDate("");
        setEndDate("");
        setPage(1);
    }, []);

    // =========================================================
    // Get payment by ID
    // =========================================================

    const fetchPaymentById = useCallback(
        async (paymentId) => {
            try {
                setLoadingPayment(true);
                setError(null);

                const response =
                    await getPaymentByIdService(
                        paymentId
                    );

                const data = response?.data;

                setPayment(data ?? null);

                return response;
            } catch (error) {
                console.error(
                    "Failed to fetch payment:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to fetch payment"
                );

                setPayment(null);

                throw error;
            } finally {
                setLoadingPayment(false);
            }
        },
        []
    );

    // =========================================================
    // Get invoice payment history
    // =========================================================

    const fetchInvoicePayments = useCallback(
        async (invoiceId) => {
            try {
                setLoadingInvoicePayments(true);
                setError(null);

                const response =
                    await getInvoicePaymentsService(
                        invoiceId
                    );

                const data = response?.data;

                setInvoicePayments(
                    data?.payments ?? []
                );

                setPaymentSummary(
                    data?.summary ?? {
                        totalPaid: 0,
                        outstandingAmount: 0,
                    }
                );

                return response;
            } catch (error) {
                console.error(
                    "Failed to fetch invoice payments:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to fetch invoice payments"
                );

                setInvoicePayments([]);

                setPaymentSummary({
                    totalPaid: 0,
                    outstandingAmount: 0,
                });

                throw error;
            } finally {
                setLoadingInvoicePayments(false);
            }
        },
        []
    );

    // =========================================================
    // Reset error
    // =========================================================

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // =========================================================
    // Return
    // =========================================================

    return {
        // Payment list
        payments,
        pagination,

        // Payment pagination
        page,
        limit,
        setPage,
        setLimit,

        // Payment filters
        search,
        status,
        method,
        startDate,
        endDate,

        setSearch,
        setStatus,
        setMethod,
        setStartDate,
        setEndDate,

        clearFilters,

        // Individual payment
        payment,

        // Invoice payments
        invoicePayments,
        paymentSummary,

        // Loading states
        loading,
        creatingPayment,
        loadingPayment,
        loadingInvoicePayments,

        // Error
        error,

        // Actions
        createManualPayment,
        fetchPayments,
        fetchPaymentById,
        fetchInvoicePayments,
        clearError,
    };
};

export default usePayments;