/**
 * Format a number as Indian Rupee (INR).
 *
 * @param {number|string} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
    const value = Number(amount) || 0;

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};