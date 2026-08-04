/**
 * Calculate invoice totals
 *
 * @param {Array} items
 * @returns {{
 *   subtotal: number,
 *   tax: number,
 *   total: number
 * }}
 */
export const calculateInvoiceTotals = (items = []) => {
    let subtotal = 0;
    let tax = 0;

    items.forEach((item) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unitPrice) || 0;
        const taxRate = Number(item.taxRate) || 0;

        const itemAmount = quantity * unitPrice;
        const itemTax = (itemAmount * taxRate) / 100;

        subtotal += itemAmount;
        tax += itemTax;
    });

    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total,
    };
};