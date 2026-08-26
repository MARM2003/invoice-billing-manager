import PropTypes from "prop-types";

import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const PaymentEmptyState = ({
    hasFilters,
    onClearFilters,
}) => {
    return (
        <Box
            sx={{
                py: 8,
                textAlign: "center",
            }}
        >
            <PaymentsOutlinedIcon
                sx={{
                    fontSize: 60,
                    color: "text.disabled",
                    mb: 2,
                }}
            />

            <Typography
                variant="h6"
                fontWeight={600}
            >
                {hasFilters
                    ? "No payments found"
                    : "No payments recorded yet"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
            >
                {hasFilters
                    ? "Try adjusting your search or filters."
                    : "Payments recorded against your invoices will appear here."}
            </Typography>

            {hasFilters && (
                <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={onClearFilters}
                >
                    Clear Filters
                </Button>
            )}
        </Box>
    );
};

PaymentEmptyState.propTypes = {
    hasFilters: PropTypes.bool.isRequired,
    onClearFilters: PropTypes.func.isRequired,
};

export default PaymentEmptyState;