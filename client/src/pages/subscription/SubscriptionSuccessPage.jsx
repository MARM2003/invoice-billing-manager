// import {
//     Box,
//     Button,
//     Paper,
//     Stack,
//     Typography,
// } from "@mui/material";


// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useNavigate } from "react-router-dom";

// const SubscriptionSuccessPage = () => {
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
//                 elevation={2}
//                 sx={{
//                     maxWidth: 500,
//                     width: "100%",
//                     p: 5,
//                     borderRadius: 4,
//                     textAlign: "center",
//                 }}
//             >
//                 <Stack spacing={3} alignItems="center">
//                     <TaskAltIcon
//                         sx={{
//                             fontSize: 72,
//                             color: "success.main",
//                         }}
//                     />

//                     <Typography variant="h4" fontWeight={800}>
//                         Subscription Active
//                     </Typography>

//                     <Typography color="text.secondary">
//                         Your subscription has been activated
//                         successfully. You can now continue using
//                         Invoice & Billing Manager.
//                     </Typography>

//                     <Button
//                         variant="contained"
//                         size="large"
//                         onClick={() => navigate("/dashboard")}
//                     >
//                         Go to Dashboard
//                     </Button>
//                 </Stack>
//             </Paper>
//         </Box>
//     );
// };

// export default SubscriptionSuccessPage;
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const SubscriptionSuccessPage = () => {
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
                            sx={{
                                fontSize: 64,
                            }}
                        >
                            ✓
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={800}
                        >
                            Payment Successful
                        </Typography>

                        <Typography color="text.secondary">
                            Your subscription payment was
                            completed successfully.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/")}
                        >
                            Go to Dashboard
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SubscriptionSuccessPage;