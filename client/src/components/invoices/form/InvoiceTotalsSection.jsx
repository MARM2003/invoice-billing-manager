import PropTypes from "prop-types";
import {
    Box,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { formatCurrency } from "../../../utils/formatCurrency.js";

const SummaryRow = ({
    label,
    value,
    bold = false,
}) => (
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
    >
        <Typography
            variant="body1"
            fontWeight={bold ? 600 : 400}
            color={bold ? "text.primary" : "text.secondary"}
        >
            {label}
        </Typography>

        <Typography
            variant="body1"
            fontWeight={bold ? 700 : 500}
        >
            {value}
        </Typography>
    </Stack>
);

SummaryRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    bold: PropTypes.bool,
};

const InvoiceTotalsSection = ({
    subtotal,
    tax,
    total,
}) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
            >
                Invoice Summary
            </Typography>

            <Box>
                <SummaryRow
                    label="Subtotal"
                    value={formatCurrency(subtotal)}
                />


                <SummaryRow
                    label="Tax"
                    value={formatCurrency(tax)}
                />

                <Divider sx={{ my: 2 }} />

                <SummaryRow
                    label="Grand Total"
                    value={formatCurrency(total)}
                    bold
                />
            </Box>
        </Paper>
    );
};

InvoiceTotalsSection.propTypes = {
    subtotal: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default InvoiceTotalsSection;