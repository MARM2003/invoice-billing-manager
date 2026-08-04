import PropTypes from "prop-types";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const InvoiceSummaryCards = ({ invoices }) => {
    const summary = {
        total: invoices.length,
        paid: invoices.filter((invoice) => invoice.status === "PAID").length,
        sent: invoices.filter((invoice) => invoice.status === "SENT").length,
        overdue: invoices.filter((invoice) => invoice.status === "OVERDUE").length,
    };

    const cards = [
        {
            title: "Total Invoices",
            value: summary.total,
            icon: <DescriptionOutlinedIcon fontSize="large" />,
            color: "primary.main",
        },
        {
            title: "Paid",
            value: summary.paid,
            icon: <CheckCircleOutlinedIcon fontSize="large" />,
            color: "success.main",
        },
        {
            title: "Sent",
            value: summary.sent,
            icon: <SendOutlinedIcon fontSize="large" />,
            color: "info.main",
        },
        {
            title: "Overdue",
            value: summary.overdue,
            icon: <WarningAmberOutlinedIcon fontSize="large" />,
            color: "error.main",
        },
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Card
                        elevation={2}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            transition: "all 0.2s ease-in-out",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        fontWeight={500}
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                        mt={1}
                                    >
                                        {card.value}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        color: card.color,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {card.icon}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

InvoiceSummaryCards.propTypes = {
    invoices: PropTypes.array.isRequired,
};

export default InvoiceSummaryCards;