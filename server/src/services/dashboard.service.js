import prisma from "../prismaClient/prismaClient.js";
import ApiError from "../utils/ApiError.js";

export const getDashboardSummary = async (userId) => {

    const currentYear = new Date().getFullYear();

    const startOfYear = new Date(currentYear, 0, 1);

    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];



    const [totalCustomers, totalInvoices, paidInvoices, sentInvoices, overdueInvoices, draftInvoices, cancelledInvoices, totalRevenue, totalOutstanding, paidInvoicesThisYear] = await Promise.all([
        prisma.customer.count({
            where: {
                userId
            }
        }),
        prisma.invoice.count({
            where: {
                userId
            }
        }),
        prisma.invoice.count({
            where: {
                userId,
                status: "PAID"
            }
        }),
        prisma.invoice.count({
            where: {
                userId,
                status: "SENT"
            }
        }),
        prisma.invoice.count({
            where: {
                userId,
                status: "OVERDUE"
            }
        }),
        prisma.invoice.count({
            where: {
                userId,
                status: "DRAFT"
            }
        }),
        prisma.invoice.count({
            where: {
                userId,
                status: "CANCELLED"
            }
        }),
        prisma.invoice.aggregate({
            where: {
                userId,
                status: "PAID"
            },
            _sum: {
                totalAmount: true
            }
        }),
        prisma.invoice.aggregate({
            where: {
                userId,
                status: {
                    in: ["SENT", "OVERDUE"]
                }
            },
            _sum: {
                totalAmount: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId,
                status: "PAID",
                issueDate: {
                    gte: startOfYear,
                    lte: endOfYear,
                },
            },
            select: {
                issueDate: true,
                totalAmount: true,
            },
        })

    ])

    const monthlyRevenue = monthNames.map((month) => ({
        month,
        revenue: 0,
    }));

    for (const invoice of paidInvoicesThisYear) {
        const monthIndex = new Date(invoice.issueDate).getMonth();

        monthlyRevenue[monthIndex].revenue += Number(invoice.totalAmount);
    }

    const summary = {
        totalRevenue: Number(totalRevenue._sum.totalAmount ?? 0),
        totalOutstanding: Number(totalOutstanding._sum.totalAmount ?? 0),
        totalCustomers,
        totalInvoices,
        paidInvoices,
        sentInvoices,
        overdueInvoices,
        draftInvoices,
        cancelledInvoices,
    };

    return {
        summary,
        monthlyRevenue,
    };
}

/*
{
  "success": true,
  "message": "Dashboard data fetched successfully.",
  "data": {
  "summary": {
    "totalRevenue": 125000,
    "totalOutstanding": 28500,
    "totalPaid": 96500,
    "totalInvoices": 42,
    "paidInvoices": 28,
    "sentInvoices": 8,
    "overdueInvoices": 4,
    "draftInvoices": 2,
    "cancelledInvoices": 1,
    "totalCustomers": 18
  }
    "monthlyRevenue": [
      {
        "month": "Jan",
        "revenue": 12000
      },
      {
        "month": "Feb",
        "revenue": 18000
      },
      {
        "month": "Mar",
        "revenue": 24000
      },
      {
        "month": "Apr",
        "revenue": 17000
      },
      {
        "month": "May",
        "revenue": 26000
      },
      {
        "month": "Jun",
        "revenue": 31000
      },
      {
        "month": "Jul",
        "revenue": 29000
      }
    ]
  }
}
*/ 