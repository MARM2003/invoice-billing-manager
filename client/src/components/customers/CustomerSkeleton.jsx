import { Skeleton, Stack } from "@mui/material";

const CustomerSkeleton = ({ rows = 8 }) => {
    return (
        <Stack spacing={1}>
            {Array.from({ length: rows }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rounded"
                    height={56}
                    animation="wave"
                />
            ))}
        </Stack>
    );
};

export default CustomerSkeleton;