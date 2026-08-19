import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

const DashboardSummaryCards = ({ summary }) => {
    const cards = [
        {
            title: "Total Revenue",
            value: `₹${summary.totalRevenue.toLocaleString()}`
        },
        {
            title: "Outstanding",
            value: `₹${summary.totalOutstanding.toLocaleString()}`
        },
        {
            title: "Total Customers",
            value: summary.totalCustomers
        },
        {
            title: "Total Invoices",
            value: summary.totalInvoices
        },
        {
            title: "Paid",
            value: summary.paidInvoices
        },
        {
            title: "Sent",
            value: summary.sentInvoices
        },
        {
            title: "Overdue",
            value: summary.overdueInvoices
        },
        {
            title: "Draft",
            value: summary.draftInvoices
        },
        {
            title: "Cancelled",
            value: summary.cancelledInvoices
        }
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={card.title}
                >
                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardSummaryCards;