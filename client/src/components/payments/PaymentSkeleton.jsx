import PropTypes from "prop-types";

import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const PaymentSkeleton = ({
    rows = 5,
}) => {
    return (
        <Paper elevation={2}>
            <TableContainer
                sx={{
                    overflowX: "auto",
                }}
            >
                <Table size="small">

                    <TableHead>
                        <TableRow>
                            {Array.from({
                                length: 7,
                            }).map(
                                (_, index) => (
                                    <TableCell
                                        key={
                                            index
                                        }
                                    >
                                        <Skeleton />
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Array.from({
                            length: rows,
                        }).map(
                            (_, rowIndex) => (
                                <TableRow
                                    key={
                                        rowIndex
                                    }
                                >
                                    {Array.from({
                                        length: 7,
                                    }).map(
                                        (
                                            _,
                                            cellIndex
                                        ) => (
                                            <TableCell
                                                key={
                                                    cellIndex
                                                }
                                            >
                                                <Skeleton />
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            )
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </Paper>
    );
};

PaymentSkeleton.propTypes = {
    rows: PropTypes.number,
};

export default PaymentSkeleton;