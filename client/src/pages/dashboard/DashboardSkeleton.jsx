import {
    Card,
    CardContent,
    Grid,
    Skeleton,
    Box,
} from "@mui/material";

const DashboardSkeleton = () => {
    return (
        <Box p={3}>
            <Skeleton
                variant="text"
                width={220}
                height={50}
                sx={{ mb: 3 }}
            />

            <Grid container spacing={3}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    height={25}
                                />

                                <Skeleton
                                    variant="text"
                                    width="40%"
                                    height={45}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Card
                sx={{
                    mt: 4,
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <Skeleton
                        variant="text"
                        width={220}
                        height={35}
                        sx={{ mb: 2 }}
                    />

                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={350}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default DashboardSkeleton;