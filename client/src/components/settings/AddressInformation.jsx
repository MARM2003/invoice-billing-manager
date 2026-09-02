import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

const InfoItem = ({ label, value }) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 0.5 }}
        >
            {label}
        </Typography>

        <Typography
            variant="body1"
            fontWeight={500}
            sx={{ wordBreak: "break-word" }}
        >
            {value || "—"}
        </Typography>
    </Grid>
);

const AddressInformation = ({ profile }) => {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 3 }}
                >
                    Address
                </Typography>

                <Grid container spacing={3}>
                    <InfoItem
                        label="Address Line 1"
                        value={profile.addressLine1}
                    />

                    <InfoItem
                        label="Address Line 2"
                        value={profile.addressLine2}
                    />

                    <InfoItem
                        label="City"
                        value={profile.city}
                    />

                    <InfoItem
                        label="State"
                        value={profile.state}
                    />

                    <InfoItem
                        label="Country"
                        value={profile.country}
                    />

                    <InfoItem
                        label="Postal Code"
                        value={profile.postalCode}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AddressInformation;