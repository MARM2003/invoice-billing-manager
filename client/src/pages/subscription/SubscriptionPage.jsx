import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import useSubscription from "../../hooks/useSubscription.js";
import SubscriptionCard from "../../components/subscription/SubscriptionCard.jsx";

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const {
    plans,
    subscription,
    loading,
    checkoutLoading,
    subscribe,
  } = useSubscription();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const isPaidSubscription =
    subscription?.plan !== "FREE" &&
    ["ACTIVE", "TRIALING"].includes(
      subscription?.status
    );
  console.log("CURRENT SUBSCRIPTION:", subscription);
  // ----------------------------------------
  // ACTIVE PAID SUBSCRIPTION
  // ----------------------------------------

  if (isPaidSubscription) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card
          sx={{
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
                Subscription Active
              </Typography>

              <Typography color="text.secondary">
                Your subscription is active and
                you can continue using Invoice &
                Billing Manager.
              </Typography>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {subscription.plan}
                </Typography>

                <Typography
                  color="success.main"
                  fontWeight={600}
                >
                  Active
                </Typography>
              </Box>

              {subscription.currentPeriodEnd && (
                <Typography color="text.secondary">
                  Next billing date:{" "}
                  {new Date(
                    subscription.currentPeriodEnd
                  ).toLocaleDateString()}
                </Typography>
              )}

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
      </Container>
    );
  }

  // ----------------------------------------
  // FREE USER → SHOW PLANS
  // ----------------------------------------

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack
        spacing={1}
        alignItems="center"
        sx={{ mb: 6 }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          textAlign="center"
        >
          Choose your plan
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          maxWidth={600}
        >
          You've reached your free invoice
          limit. Choose a plan to continue.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid
            key={plan.id}
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <SubscriptionCard
              plan={plan}
              currentPlan={subscription?.plan}
              onSubscribe={subscribe}
              loading={checkoutLoading}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPage;  