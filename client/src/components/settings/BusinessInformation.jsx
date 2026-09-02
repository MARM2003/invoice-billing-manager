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

const BusinessInformation = ({ profile }) => {
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
                    Business Information
                </Typography>

                <Grid container spacing={3}>
                    <InfoItem
                        label="Company Name"
                        value={profile.companyName}
                    />

                    <InfoItem
                        label="GST Registered"
                        value={
                            profile.isGstRegistered
                                ? "Yes"
                                : "No"
                        }
                    />

                    <InfoItem
                        label="GST Number"
                        value={profile.gstNumber}
                    />

                    <InfoItem
                        label="PAN Number"
                        value={profile.panNumber}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BusinessInformation;