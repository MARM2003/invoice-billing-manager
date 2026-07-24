import api from "./axios";

/**
 * Get Customers
 * Supports pagination and search
 */
export const getCustomersAPI = async (params) => {
  const response = await api.get("/customers", {
    params,
  });

  return response.data;
};

/**
 * Get Customer By ID
 */
export const getCustomerByIdAPI = async (customerId) => {
  const response = await api.get(`/customers/${customerId}`);

  return response.data;
};

/**
 * Create Customer
 */
export const createCustomerAPI = async (customerData) => {
  const response = await api.post("/customers", customerData);

  return response.data;
};

/**
 * Update Customer
 */
export const updateCustomerAPI = async (
  customerId,
  customerData
) => {
  const response = await api.put(
    `/customers/${customerId}`,
    customerData
  );

  return response.data;
};

/**
 * Delete Customer
 */
export const deleteCustomerAPI = async (customerId) => {
  const response = await api.delete(`/customers/${customerId}`);

  return response.data;
};