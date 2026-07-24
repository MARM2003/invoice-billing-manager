import { success } from "zod";
import { createCustomerService, getCustomersService, getCustomerByIdService, updateCustomerService, deleteCustomerService } from "../services/customer.service.js";



export const createCustomer = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const body = req.body;
        const customer = await createCustomerService({ userId, body });

        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer
        })
    } catch (error) {
        next(error)
    }
}

export const getCustomers = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search || "";
        const customerList = await getCustomersService({
            userId,
            page,
            limit,
            search,
        })
        return res.status(200).json({
            success: true,
            message: "Customers fetched successfully.",
            data: customerList
        })
    } catch (error) {
        next(error)
    }
}

export const getCustomerById = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const userId = req.user.userId;
        const customer = await getCustomerByIdService({ userId, customerId })

        return res.status(200).json({
            success: true,
            message: "Customer fetched successfully",
            data: customer
        })
    } catch (error) {
        next(error)
    }
}


export const updateCustomer = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const customerId = req.params.id;
        const body = req.body
      
        const updatedCustomer = await updateCustomerService({ userId, customerId, body })

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully.",
            data: updatedCustomer
        })
    } catch (error) {
        next(error)
    }
}


export const deleteCustomer = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const customerId = req.params.id;

        const deletedCustomer = await deleteCustomerService({ userId, customerId })

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully.",
            data: deletedCustomer
        })
    } catch (error) {
        next(error)
    }
}