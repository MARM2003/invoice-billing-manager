const invoiceTemplate = (invoice) => {
    const {
        invoiceNumber,
        issueDate,
        dueDate,
        status,
        subtotal,
        taxAmount,
        discountAmount,
        totalAmount,
        items,
        customer,
        user,
    } = invoice;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <title>Invoice ${invoiceNumber}</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 40px;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #1f2937;
                    background: #ffffff;
                    border:2px outset #000000;
                }

                .invoice {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 40px;
                }

                .company {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .company-logo {
                    max-width: 160px;
                    max-height: 70px;
                    object-fit: contain;
                    margin-bottom: 10px;
                }

                .invoice-title {
                    text-align: right;
                }

                .invoice-title h1 {
                    margin: 0;
                    font-size: 32px;
                    letter-spacing: 1px;
                }

                .invoice-number {
                    margin-top: 8px;
                    font-size: 14px;
                    color: #6b7280;
                }

                .details-section {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 35px;
                }

                .details-box {
                    width: 48%;
                }

                .details-box h3 {
                    margin: 0 0 10px;
                    font-size: 14px;
                    text-transform: uppercase;
                    color: #6b7280;
                }

                .details-box p {
                    margin: 4px 0;
                    font-size: 14px;
                }

                .invoice-meta {
                    text-align: right;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th {
                    padding: 12px;
                    text-align: left;
                    font-size: 13px;
                    background: #f3f4f6;
                    border-bottom: 1px solid #d1d5db;
                }

                td {
                    padding: 12px;
                    font-size: 13px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .text-right {
                    text-align: right;
                }

                .totals {
                    width: 320px;
                    margin-left: auto;
                    margin-top: 25px;
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 7px 0;
                    font-size: 14px;
                }

                .grand-total {
                    margin-top: 8px;
                    padding-top: 12px;
                    border-top: 2px solid #111827;
                    font-size: 18px;
                    font-weight: bold;
                }

                .footer {
                    margin-top: 50px;
                    padding-top: 20px;
                    border-top: 1px solid #d1d5db;
                }

                .footer h3 {
                    margin: 0 0 10px;
                    font-size: 14px;
                }

                .footer p {
                    margin: 4px 0;
                    font-size: 13px;
                    color: #4b5563;
                }
            </style>
        </head>

        <body>
            <div class="invoice">

                <!-- Header -->
                <div class="header">

                    <div class="company">
                        ${user.logo
            ? `<img
                                    src="${user.logo}"
                                    class="company-logo"
                                    alt="Company Logo"
                                />`
            : ""
        }

                        <strong>${user.companyName}</strong>

                        ${user.address
            ? `<span>${user.address}</span>`
            : ""
        }
                    </div>

                    <div class="invoice-title">
                        <h1>INVOICE</h1>

                        <div class="invoice-number">
                            #${invoiceNumber}
                        </div>
                    </div>

                </div>

                <!-- Customer + Invoice Details -->
                <div class="details-section">

                    <div class="details-box">
                        <h3>Bill To</h3>

                        <p><strong>${customer.name}</strong></p>

                        ${customer.companyName
            ? `<p>${customer.companyName}</p>`
            : ""
        }

                        ${customer.email
            ? `<p>${customer.email}</p>`
            : ""
        }

                        ${customer.billingAddress
            ? `<p>${customer.billingAddress}</p>`
            : ""
        }

                        ${customer.gstNumber
            ? `<p>GSTIN: ${customer.gstNumber}</p>`
            : ""
        }
                    </div>

                    <div class="details-box invoice-meta">
                        <h3>Invoice Details</h3>

                        <p>
                            <strong>Issue Date:</strong>
                            ${new Date(issueDate).toLocaleDateString("en-IN")}
                        </p>

                        <p>
                            <strong>Due Date:</strong>
                            ${new Date(dueDate).toLocaleDateString("en-IN")}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${status}
                        </p>
                    </div>

                </div>

                <!-- Items -->
                <table>

                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="text-right">Qty</th>
                            <th class="text-right">Unit Price</th>
                            <th class="text-right">Tax</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${items
            .map(
                (item) => `
                                    <tr>
                                        <td>${item.description}</td>

                                        <td class="text-right">
                                            ${item.quantity}
                                        </td>

                                        <td class="text-right">
                                            ₹${Number(item.unitPrice).toLocaleString("en-IN")}
                                        </td>

                                        <td class="text-right">
                                            ${item.taxRate}%
                                        </td>

                                        <td class="text-right">
                                            ₹${(
                        Number(item.quantity) *
                        Number(item.unitPrice)
                    ).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                `
            )
            .join("")}

                    </tbody>

                </table>

                <!-- Totals -->
                <div class="totals">

                    <div class="total-row">
                        <span>Subtotal</span>
                        <span>
                            ₹${Number(subtotal).toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div class="total-row">
                        <span>Tax</span>
                        <span>
                            ₹${Number(taxAmount).toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div class="total-row">
                        <span>Discount</span>
                        <span>
                            ₹${Number(discountAmount).toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div class="total-row grand-total">
                        <span>Total</span>
                        <span>
                            ₹${Number(totalAmount).toLocaleString("en-IN")}
                        </span>
                    </div>

                </div>

                <!-- Issuer Footer -->
                <div class="footer">

                    <h3>Issued By</h3>

                    <p>
                        <strong>${user.companyName}</strong>
                    </p>

                    <p>${user.name}</p>

                    ${user.email
            ? `<p>${user.email}</p>`
            : ""
        }

                    ${user.phone
            ? `<p>${user.phone}</p>`
            : ""
        }

                    ${user.address
            ? `<p>${user.address}</p>`
            : ""
        }

                </div>

            </div>
        </body>
        </html>
    `;
};

export default invoiceTemplate;