import prisma from "../prismaClient/prismaClient.js";
import ApiError from "../utils/ApiError.js";

export const createManualPayment = async ({
    userId,
    invoiceId,
    customerId,
    amount,
    method,
    transactionId,
    reference,
    notes,
}) => {
    const [invoice, customer] = await Promise.all([
        prisma.invoice.findFirst({
            where: {
                id: invoiceId,
                userId,
            },
            include: {
                payments: {
                    where: {
                        status: "PAID",
                    },
                    select: {
                        amount: true,
                    },
                },
            },
        }),

        prisma.customer.findFirst({
            where: {
                id: customerId,
                userId,
            },
            select: {
                id: true,
            },
        }),
    ]);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    if (!customer) {
        throw new ApiError(404, "Customer not found");
    }

    if (invoice.customerId !== customerId) {
        throw new ApiError(
            400,
            "Customer does not belong to this invoice"
        );
    }

    const totalPaid = invoice.payments.reduce(
        (total, payment) => total + Number(payment.amount),
        0
    );

    const invoiceTotal = Number(invoice.totalAmount);

    const outstandingAmount = invoiceTotal - totalPaid;

    if (Number(amount) > outstandingAmount) {
        throw new ApiError(
            400,
            `Payment amount cannot exceed outstanding amount of ${outstandingAmount}`
        );
    }

    const newTotalPaid = totalPaid + Number(amount);

    let newInvoiceStatus;

    if (newTotalPaid >= invoiceTotal) {
        newInvoiceStatus = "PAID";
    } else if (newTotalPaid > 0) {
        newInvoiceStatus = "PARTIALLY_PAID";
    } else {
        newInvoiceStatus = invoice.status;
    }

    const result = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
            data: {
                amount,
                method,
                transactionId,
                reference,
                notes,
                invoiceId,
                customerId,
                userId,
                status: "PAID",
            },
        });

        const updatedInvoice = await tx.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                status: newInvoiceStatus,
            },
        });

        return {
            payment,
            invoice: updatedInvoice,
        };
    });

    return result;
};

export const getPayments = async ({
    userId,
    page = 1,
    limit = 10,
    search = "",
    status,
    method,
}) => {
    const skip = (page - 1) * limit;

    const where = {
        userId,
    };

    // Filter by payment status
    if (status) {
        where.status = status;
    }

    // Filter by payment method
    if (method) {
        where.method = method;
    }

    // Search by invoice number, customer name, or transaction/reference
    if (search.trim()) {
        where.OR = [
            {
                invoice: {
                    invoiceNumber: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
            },
            {
                customer: {
                    name: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
            },
            {
                transactionId: {
                    contains: search.trim(),
                    mode: "insensitive",
                },
            },
            {
                reference: {
                    contains: search.trim(),
                    mode: "insensitive",
                },
            },
        ];
    }

    const [payments, totalPayments] = await Promise.all([
        prisma.payment.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                paymentDate: "desc",
            },
            include: {
                invoice: {
                    select: {
                        id: true,
                        invoiceNumber: true,
                        totalAmount: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        name: true,
                        companyName: true,
                    },
                },
            },
        }),

        prisma.payment.count({
            where,
        }),
    ]);

    const totalPages = Math.ceil(totalPayments / limit);

    return {
        payments,
        pagination: {
            page,
            limit,
            totalPayments,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};

export const getPaymentById = async ({
    userId,
    paymentId,
}) => {
    const payment = await prisma.payment.findFirst({
        where: {
            id: paymentId,
            userId,
        },
        include: {
            invoice: {
                select: {
                    id: true,
                    invoiceNumber: true,
                    issueDate: true,
                    dueDate: true,
                    status: true,
                    subtotal: true,
                    taxAmount: true,
                    discountAmount: true,
                    totalAmount: true,
                },
            },
            customer: {
                select: {
                    id: true,
                    name: true,
                    companyName: true,
                    email: true,
                    phone: true,
                },
            },
        },
    });

    if (!payment) {
        throw new ApiError(404, "Payment not found");
    }

    return payment;
};

export const getInvoicePayments = async ({
    userId,
    invoiceId,
}) => {
    const invoice = await prisma.invoice.findFirst({
        where: {
            id: invoiceId,
            userId,
        },
        select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            status: true,
        },
    });

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    const payments = await prisma.payment.findMany({
        where: {
            invoiceId,
            userId,
        },
        orderBy: {
            paymentDate: "desc",
        },
        select: {
            id: true,
            amount: true,
            paymentDate: true,
            method: true,
            status: true,
            transactionId: true,
            reference: true,
            notes: true,
            createdAt: true,
        },
    });

    const totalPaid = payments
        .filter((payment) => payment.status === "PAID")
        .reduce(
            (total, payment) => total + Number(payment.amount),
            0
        );

    const invoiceTotal = Number(invoice.totalAmount);

    const outstandingAmount = invoiceTotal - totalPaid;

    return {
        invoice: {
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            totalAmount: invoice.totalAmount,
            status: invoice.status,
        },

        payments,

        summary: {
            totalPaid,
            outstandingAmount,
        },
    };
};