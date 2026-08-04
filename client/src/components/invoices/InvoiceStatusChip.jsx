import PropTypes from "prop-types";
import { Chip } from "@mui/material";

import { INVOICE_STATUS } from "../../utils/invoiceStatus";

const InvoiceStatusChip = ({ status }) => {
  const config = INVOICE_STATUS[status] || {
    label: status ?? "Unknown",
    color: "default",
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
    />
  );
};

InvoiceStatusChip.propTypes = {
  status: PropTypes.string.isRequired,
};

export default InvoiceStatusChip;