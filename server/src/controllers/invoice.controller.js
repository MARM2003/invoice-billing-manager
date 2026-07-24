import { createInvoiceService } from "../services/invoice.service.js";

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