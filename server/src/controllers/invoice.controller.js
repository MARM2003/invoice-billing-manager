import { success } from "zod";
import { createInvoiceService, getInvoicesService, getInvoiceByIdService, updateInvoiceService, deleteInvoiceService } from "../services/invoice.service.js";

export const createInvoice = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const invoice = await createInvoiceService(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully.",
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search || ""
    const customerId = req.query.customerId;

    const result = await getInvoicesService(userId, page, limit, search, customerId)

    return res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      data: result.invoices,
      pagination: result.pagination
    })
  } catch (error) {
    next(error)
  }
}

export const getInvoiceById = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const invoiceId = req.params.id

    const invoice = await getInvoiceByIdService(invoiceId, userId);

    return res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
      data: invoice
    })
  } catch (error) {
    next(error)
  }
}

export const updateInvoice = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const invoiceId = req.params.id
    const invoiceData = req.body
    const updatedInvoice = await updateInvoiceService(invoiceId, userId, invoiceData)

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice
    })
  } catch (error) {
    next(error)
  }
}


export const deleteInvoice = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const invoiceId = req.params.id

    const deletedInvoice = await deleteInvoiceService(invoiceId, userId)

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: deletedInvoice
    })
  } catch (error) {
    next(error)
  }
}