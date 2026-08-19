import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const MonthlyRevenueChart = ({ monthlyRevenue }) => {
    if (!monthlyRevenue) return null;

    return (
        <Card
            elevation={2}
            sx={{
                mt: 4,
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={3}
                >
                    Monthly Revenue
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <LineChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip
                            formatter={(value) =>
                                `₹${Number(value).toLocaleString()}`
                            }
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#1976d2"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default MonthlyRevenueChart;