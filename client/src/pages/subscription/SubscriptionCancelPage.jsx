// import {
//     Box,
//     Button,
//     Paper,
//     Stack,
//     Typography,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";

// const SubscriptionCancelPage = () => {
//     const navigate = useNavigate();

//     return (
//         <Box
//             sx={{
//                 minHeight: "70vh",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 px: 2,
//             }}
//         >
//             <Paper
//                 sx={{
//                     maxWidth: 500,
//                     width: "100%",
//                     p: 5,
//                     borderRadius: 4,
//                     textAlign: "center",
//                 }}
//             >
//                 <Stack spacing={3}>
//                     <Typography variant="h4" fontWeight={800}>
//                         Payment Cancelled
//                     </Typography>

//                     <Typography color="text.secondary">
//                         Your payment was cancelled. Your account
//                         has not been charged.
//                     </Typography>

//                     <Button
//                         variant="outlined"
//                         onClick={() => navigate("/subscription")}
//                     >
//                         Back to Plans
//                     </Button>
//                 </Stack>
//             </Paper>
//         </Box>
//     );
// };

// export default SubscriptionCancelPage;
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const SubscriptionCancelPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: 4,
                }}
            >
                <CardContent sx={{ p: 5 }}>
                    <Stack
                        spacing={3}
                        alignItems="center"
                        textAlign="center"
                    >
                        <Typography
                            variant="h4"
                            fontWeight={800}
                        >
                            Payment Cancelled
                        </Typography>

                        <Typography color="text.secondary">
                            Your payment was cancelled. You
                            can return to the subscription page
                            whenever you're ready.
                        </Typography>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() =>
                                navigate("/subscription")
                            }
                        >
                            Back to Plans
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SubscriptionCancelPage;