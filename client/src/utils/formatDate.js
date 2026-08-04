/**
 * Format a date into DD MMM YYYY format.
 *
 * Example:
 * 2026-08-03 -> 03 Aug 2026
 *
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};