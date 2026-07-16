import prisma from "../prismaClient/prismaClient.js";
import ApiError from "../utils/ApiError.js";

//create the customer for specific user
export const createCustomerService = async ({ userId, body }) => {
    try {
        // Normalize email before checking and saving
        if (body.email) {
            body.email = body.email.toLowerCase().trim();
        }

        // Build duplicate check dynamically
        const duplicateConditions = [];

        if (body.email) {
            duplicateConditions.push({
                email: body.email,
            });
        }

        if (body.phone) {
            duplicateConditions.push({
                phone: body.phone,
            });
        }
        // Only check duplicates when email or phone is provided
        if (duplicateConditions.length > 0) {
            const existingCustomer = await prisma.customer.findFirst({
                where: {
                    userId,
                    OR: duplicateConditions,
                },
            });

            if (existingCustomer) {
                throw new ApiError(
                    409,
                    "A customer with the same email or phone already exists."
                );
            }
        }

        const customer = await prisma.customer.create({
            data: {
                ...body,
                userId,
            },
        });

        return customer;
    } catch (error) {
        throw error;
    }
};

//get all customers for specific user
export const getCustomersService = async ({
    userId,
    page,
    limit,
    search, }) => {
    try {
        //simple where clause
        const where = {
            userId,
        };
        // search by name, company_name,phone,email
        if (search?.trim()) {
            const searchTerm = search.trim();
            where.OR = [
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    companyName: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    phone: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ];
        }
        // calc for the skip
        const skip = (page - 1) * limit;
        //promise.all for both queries
        const [totalCustomers, customers] = await Promise.all([
            prisma.customer.count({ where, }),
            prisma.customer.findMany({
                where,
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: limit,
            })
        ])

        const totalPages = Math.ceil(totalCustomers / limit);
        return {
            customers,
            pagination: {
                page,
                limit,
                totalCustomers,
                totalPages,
            }
        };
    } catch (error) {
        throw error;
    }
}

//get customer by ID for the specific user
export const getCustomerByIdService = async ({ userId, customerId }) => {
    try {
        const customer = await prisma.customer.findFirst({
            where: {
                id: customerId,
                userId,
            }
        })
        if (!customer) {
            throw new ApiError(404, "Customer not found.");
        }
        return customer;
    } catch (error) {
        throw error
    }
}

//update user service
export const updateCustomerService = async ({ userId, customerId, body }) => {
    try {
        const customer = await prisma.customer.findFirst({
            where: {
                id: customerId,
                userId,
            }
        })
        if (!customer) { throw new ApiError(404, "Customer not found") }
        const updatedCustomer = await prisma.customer.update({
            where: {
                id: customerId
            },
            data: body
        })
        return updatedCustomer;
    } catch (error) {
        throw error
    }

}

//delete the customer of a sepecific user
export const deleteCustomerService=async({userId,customerId})=>{
    try {
        const customer=await prisma.customer.findFirst({
            where:{
                id:customerId,
                userId
            }
        })
        if(!customer){throw new ApiError(404,"Customer not found")}

        const deletedCustomer=await prisma.customer.delete({
            where:{
                id:customerId,
            }
        })
        return deletedCustomer
    } catch (error) {
        throw error
    }
}