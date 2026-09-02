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

const PaymentInformation = ({ profile }) => {
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
                    Bank & Payment Information
                </Typography>

                <Grid container spacing={3}>
                    <InfoItem
                        label="Bank Name"
                        value={profile.bankName}
                    />

                    <InfoItem
                        label="Account Holder"
                        value={profile.accountHolderName}
                    />

                    <InfoItem
                        label="Account Number"
                        value={profile.accountNumber}
                    />

                    <InfoItem
                        label="IFSC Code"
                        value={profile.ifscCode}
                    />

                    <InfoItem
                        label="UPI ID"
                        value={profile.upiId}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PaymentInformation;