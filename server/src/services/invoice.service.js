import prisma from "../prismaClient/prismaClient.js";
import ApiError from "../utils/ApiError.js";
export const createInvoiceService = async (userId, invoiceData) => {
    const {
        customerId,
        issueDate,
        dueDate,
        status,
        notes,
        items,
    } = invoiceData;

    // Check if customer exists and belongs to the logged-in user
    const customer = await prisma.customer.findFirst({
        where: {
            id: customerId,
            userId,
        },
    });

    if (!customer) {
        throw new ApiError(404, "Customer not found.");
    }

    // Generate invoice number
    const latestInvoice = await prisma.invoice.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            invoiceNumber: true,
        },
    });

    let invoiceNumber = "INV-0001";

    if (latestInvoice) {
        const lastNumber = parseInt(
            latestInvoice.invoiceNumber.replace("INV-", ""),
            10
        );

        invoiceNumber = `INV-${String(lastNumber + 1).padStart(4, "0")}`;
    }

    let subtotal = 0;
    let taxAmount = 0;

    const invoiceItems = items.map((item) => {
        const amount = item.quantity * item.unitPrice;
        const itemTax = (amount * item.taxRate) / 100;

        subtotal += amount;
        taxAmount += itemTax;

        return {
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
            amount,
        };
    });

    const discountAmount = 0;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const invoice = await prisma.$transaction(async (tx) => {
        return tx.invoice.create({
            data: {
                invoiceNumber,
                issueDate,
                dueDate,
                status,
                notes,

                subtotal,
                taxAmount,
                discountAmount,
                totalAmount,

                customer: {
                    connect: {
                        id: customerId,
                    },
                },

                user: {
                    connect: {
                        id: userId,
                    },
                },

                items: {
                    create: invoiceItems,
                },
            },
            include: {
                customer: true,
                items: true,
            },
        });
    });

    return invoice;
};

export const getInvoicesService = async (userId, page = 1, limit = 10, search = "", customerId) => {
    const skip = (page - 1) * limit

    const searchTerm = search?.trim()
    const where = {
        userId,
        ...(customerId && { customerId }),
        ...(searchTerm && {
            OR: [
                {
                    invoiceNumber: {
                        contains: searchTerm,
                        mode: "insensitive"
                    },
                },
                {
                    customer: {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        }),
    };

    const [invoices, totalInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        companyName: true,
                        email: true,
                    },
                },
            },
        }),

        prisma.invoice.count({
            where,
        })
    ])

    if (!invoices || !totalInvoices) {
        throw new ApiError(404, "No invoices found.")
    }

    return {
        invoices,
        pagination: {
            page,
            limit,
            totalInvoices,
            totalPages: Math.ceil(totalInvoices / limit)
        },
    }
}

export const getInvoiceByIdService = async (invoiceId, userId) => {

    const invoice = await prisma.invoice.findFirst({
        where: {
            id: invoiceId,
            userId
        },
        include: {
            customer: true,
            items: true
        }
    })

    if (!invoice) {
        throw new ApiError(404, "Invoice not found.");
    }

    return invoice
}

export const updateInvoiceService = async (invoiceId, userId, invoiceData) => {

    const {
        customerId,
        issueDate,
        dueDate,
        status,
        notes,
        items,
    } = invoiceData;

    const [existingInvoice, existingCustomer] = await Promise.all([
        prisma.invoice.findFirst({
            where: {
                id: invoiceId,
                userId,
            },
        }),
        prisma.customer.findFirst({
            where: {
                id: customerId,
                userId,
            },
        }),
    ]);
    if (!existingInvoice) {
        throw new ApiError(404, "Invoice not found")
    }

    if (!existingCustomer) {
        throw new ApiError(404, "Customer not found")
    }

    let subtotal = 0;
    let taxAmount = 0;


    const invoiceItems = items.map((item) => {
        const amount = item.quantity * item.unitPrice;
        const itemTax = (amount * item.taxRate) / 100;

        subtotal += amount;
        taxAmount += itemTax;

        return {
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
            amount,
        };
    });

    const discountAmount = 0;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const updatedInvoice = await prisma.$transaction(async (tx) => {
        // 1. Update the invoice details
        await tx.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                customerId,
                issueDate,
                dueDate,
                status,
                notes,
                subtotal,
                taxAmount,
                discountAmount,
                totalAmount,
            },
        });

        // 2. Remove all existing invoice items
        await tx.invoiceItem.deleteMany({
            where: {
                invoiceId,
            },
        });

        // 3. Insert the updated invoice items
        await tx.invoiceItem.createMany({
            data: invoiceItems.map((item) => ({
                ...item,
                invoiceId,
            })),
        });

        // 4. Fetch and return the updated invoice
        return await tx.invoice.findUnique({
            where: {
                id: invoiceId,
            },
            include: {
                customer: true,
                items: true,
            },
        });
    });

    return updatedInvoice;
}

export const deleteInvoiceService = async (invoiceId, userId) => {
    const existingCustomer = await prisma.invoice.findFirst({
        where: {
            id: invoiceId,
            userId
        }
    })
    if (!existingCustomer) {
        throw new ApiError(404, "Invoice not found")
    }


    const deletedInvoice = await prisma.invoice.delete({
        where: {
            id: invoiceId,
        }
    })

    return deletedInvoice;
}