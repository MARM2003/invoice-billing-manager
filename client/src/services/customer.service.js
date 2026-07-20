import {
  getCustomersAPI,
  getCustomerByIdAPI,
  createCustomerAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
} from "../api/customer.api.js";

/**
 * Get Customers
 */
export const getCustomersService = async ({
  page,
  limit,
  search,
}) => {
  return await getCustomersAPI({
    page,
    limit,
    search,
  });
};

/**
 * Get Customer By ID
 */
export const getCustomerByIdService = async (customerId) => {
  return await getCustomerByIdAPI(customerId);
};

/**
 * Create Customer
 */
export const createCustomerService = async (customerData) => {
  return await createCustomerAPI(customerData);
};

/**
 * Update Customer
 */
export const updateCustomerService = async (
  customerId,
  customerData
) => {
  return await updateCustomerAPI(customerId, customerData);
};

/**
 * Delete Customer
 */
export const deleteCustomerService = async (customerId) => {
  return await deleteCustomerAPI(customerId);
};