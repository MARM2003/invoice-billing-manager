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