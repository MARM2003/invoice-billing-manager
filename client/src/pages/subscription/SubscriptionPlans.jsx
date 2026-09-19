// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Container,
//   Grid,
//   Stack,
//   Typography,
// } from "@mui/material";

// import SubscriptionCard from "../../components/subscription/SubscriptionCard.jsx";

// import useSubscription from "../../hooks/useSubscription.js";

// const SubscriptionPage = () => {
//   const {
//     plans,
//     subscription,
//     loading,
//     checkoutLoading,
//     subscribe,
//   } = useSubscription();

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           py: 10,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const currentPlan = subscription?.plan;

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       <Stack spacing={1} alignItems="center" sx={{ mb: 6 }}>
//         <Typography
//           variant="h3"
//           fontWeight={800}
//           textAlign="center"
//         >
//           Choose your plan
//         </Typography>

//         <Typography
//           color="text.secondary"
//           textAlign="center"
//           maxWidth={600}
//         >
//           Continue managing your invoices with a plan
//           that works for your business.
//         </Typography>
//       </Stack>

//       {currentPlan === "FREE" &&
//         subscription?.invoiceCount >= 25 && (
//           <Alert severity="warning" sx={{ mb: 4 }}>
//             You've reached your free invoice limit.
//             Subscribe to continue creating invoices.
//           </Alert>
//         )}

//       <Grid container spacing={3}>
//         {plans.map((plan) => (
//           <Grid
//             key={plan.id}
//             size={{
//               xs: 12,
//               md: 4,
//             }}
//           >
//             <SubscriptionCard
//               plan={plan}
//               currentPlan={currentPlan}
//               onSubscribe={subscribe}
//               loading={checkoutLoading}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default SubscriptionPage;