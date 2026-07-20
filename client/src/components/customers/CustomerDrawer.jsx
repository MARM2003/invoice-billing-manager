import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import DetailItem from "./DetailItem";

const CustomerDrawer = ({
    open,
    onClose,
    customer,
}) => {
    if (!customer) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: 420,
                    },
                    p: 3,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Customer Details
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h6">
                            {customer.name}
                        </Typography>

                        <Typography color="text.secondary">
                            {customer.companyName || "-"}
                        </Typography>
                    </Box>

                    <DetailItem
                        label="Email"
                        value={customer.email}
                    />

                    <DetailItem
                        label="Phone"
                        value={customer.phone}
                    />

                    <Divider />

                    <DetailItem
                        label="GST Number"
                        value={customer.gstNumber}
                    />

                    <DetailItem
                        label="Tax ID"
                        value={customer.taxId}
                    />

                    <Divider />

                    <DetailItem
                        label="Billing Address"
                        value={customer.billingAddress}
                    />

                    <DetailItem
                        label="Shipping Address"
                        value={customer.shippingAddress}
                    />

                    <Divider />

                    <DetailItem
                        label="Notes"
                        value={customer.notes}
                    />

                    <Divider />

                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Status
                        </Typography>

                        <Chip
                            label={
                                customer.isActive
                                    ? "Active"
                                    : "Inactive"
                            }
                            color={
                                customer.isActive
                                    ? "success"
                                    : "default"
                            }
                        />
                    </Box>

                    <Divider />

                    <DetailItem
                        label="Created At"
                        value={new Date(
                            customer.createdAt
                        ).toLocaleDateString()}
                    />
                </Stack>
            </Box>
        </Drawer>
    );
};

export default CustomerDrawer;