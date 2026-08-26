import PropTypes from "prop-types";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const PaymentToolbar = ({
    search,
    status,
    method,
    startDate,
    endDate,
    onSearchChange,
    onStatusChange,
    onMethodChange,
    onStartDateChange,
    onEndDateChange,
    onClearFilters,
}) => {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
            }}
        >
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                alignItems={{
                    xs: "stretch",
                    sm: "center",
                }}
                flexWrap="wrap"
            >
                {/* Search */}

                <TextField
                    size="small"
                    label="Search payments"
                    placeholder="Invoice, customer, transaction..."
                    value={search}
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value
                        )
                    }
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 240,
                            md: 280,
                        },
                        flex: 1,
                    }}
                />

                {/* Status */}

                <FormControl
                    size="small"
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 150,
                        },
                    }}
                >
                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(event) =>
                            onStatusChange(
                                event.target.value
                            )
                        }
                    >
                        <MenuItem value="">
                            All Statuses
                        </MenuItem>

                        <MenuItem value="PAID">
                            Paid
                        </MenuItem>

                        <MenuItem value="PENDING">
                            Pending
                        </MenuItem>

                        <MenuItem value="FAILED">
                            Failed
                        </MenuItem>

                        <MenuItem value="REFUNDED">
                            Refunded
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Method */}

                <FormControl
                    size="small"
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 160,
                        },
                    }}
                >
                    <InputLabel>
                        Payment Method
                    </InputLabel>

                    <Select
                        value={method}
                        label="Payment Method"
                        onChange={(event) =>
                            onMethodChange(
                                event.target.value
                            )
                        }
                    >
                        <MenuItem value="">
                            All Methods
                        </MenuItem>

                        <MenuItem value="STRIPE">
                            Stripe
                        </MenuItem>

                        <MenuItem value="CASH">
                            Cash
                        </MenuItem>

                        <MenuItem value="UPI">
                            UPI
                        </MenuItem>

                        <MenuItem value="BANK_TRANSFER">
                            Bank Transfer
                        </MenuItem>

                        <MenuItem value="CARD">
                            Card
                        </MenuItem>

                        <MenuItem value="OTHER">
                            Other
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Start Date */}

                <TextField
                    size="small"
                    type="date"
                    label="From"
                    value={startDate}
                    onChange={(event) =>
                        onStartDateChange(
                            event.target.value
                        )
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 150,
                        },
                    }}
                />

                {/* End Date */}

                <TextField
                    size="small"
                    type="date"
                    label="To"
                    value={endDate}
                    onChange={(event) =>
                        onEndDateChange(
                            event.target.value
                        )
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 150,
                        },
                    }}
                />

                {/* Clear */}

                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={
                        <ClearOutlinedIcon />
                    }
                    onClick={onClearFilters}
                >
                    Clear
                </Button>
            </Stack>
        </Box>
    );
};

PaymentToolbar.propTypes = {
    search: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onMethodChange: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
};

export default PaymentToolbar;