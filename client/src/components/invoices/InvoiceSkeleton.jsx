import {
    Box,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const InvoiceSkeleton = ({ rows = 5 }) => {
    return (
        <Paper elevation={2}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <TableCell key={index}>
                                    <Skeleton
                                        variant="text"
                                        width={80}
                                        height={28}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {/* Invoice Number */}
                                <TableCell>
                                    <Skeleton
                                        variant="text"
                                        width={90}
                                        height={28}
                                    />
                                </TableCell>

                                {/* Customer */}
                                <TableCell>
                                    <Skeleton
                                        variant="text"
                                        width={140}
                                        height={28}
                                    />
                                </TableCell>

                                {/* Issue Date */}
                                <TableCell>
                                    <Skeleton
                                        variant="text"
                                        width={90}
                                        height={28}
                                    />
                                </TableCell>

                                {/* Due Date */}
                                <TableCell>
                                    <Skeleton
                                        variant="text"
                                        width={90}
                                        height={28}
                                    />
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <Skeleton
                                        variant="rounded"
                                        width={80}
                                        height={28}
                                    />
                                </TableCell>

                                {/* Amount */}
                                <TableCell align="right">
                                    <Skeleton
                                        variant="text"
                                        width={80}
                                        height={28}
                                        sx={{ ml: "auto" }}
                                    />
                                </TableCell>

                                {/* Actions */}
                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Skeleton */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={1.5}
            >
                <Skeleton
                    variant="text"
                    width={180}
                    height={30}
                />

                <Skeleton
                    variant="rounded"
                    width={220}
                    height={36}
                />
            </Box>
        </Paper>
    );
};

export default InvoiceSkeleton;