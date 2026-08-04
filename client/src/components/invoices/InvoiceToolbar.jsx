import PropTypes from "prop-types";
import {
    Box,
    Button,
    Stack,
    TextField,
    InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const InvoiceToolbar = ({
    search,
    onSearchChange,
    onCreateInvoice,
}) => {
    return (
        <Box sx={{ mb: 3 ,mt:3}}>
            <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", lg: "center" }}
            >
                {/* Search */}
                <TextField
                    label="Search"
                    placeholder="Invoice number or customer..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoComplete="off"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        flex: 1,
                        maxWidth: {
                            xs: "100%",
                            lg: 500,
                        },
                    }}
                />

                {/* Create Invoice Button */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateInvoice}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                        minWidth: {
                            sm: 180,
                        },
                    }}
                >
                    Create Invoice
                </Button>
            </Stack>
        </Box>
    );
};

InvoiceToolbar.propTypes = {
    search: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onCreateInvoice: PropTypes.func.isRequired,
};

export default InvoiceToolbar;