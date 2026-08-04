import PropTypes from "prop-types";
import {
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const InvoiceEmptyState = ({
    title = "No invoices found",
    description = "You haven't created any invoices yet. Create your first invoice to start managing customer billing and payments.",
    actionLabel = "Create Invoice",
    onAction,
}) => {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 6,
                borderRadius: 3,
                textAlign: "center",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <ReceiptLongOutlinedIcon
                    sx={{
                        fontSize: 72,
                        color: "text.disabled",
                    }}
                />

                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: 500,
                    }}
                >
                    {description}
                </Typography>

                {onAction && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAction}
                        sx={{
                            mt: 2,
                        }}
                    >
                        {actionLabel}
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

InvoiceEmptyState.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    actionLabel: PropTypes.string,
    onAction: PropTypes.func,
};

export default InvoiceEmptyState;