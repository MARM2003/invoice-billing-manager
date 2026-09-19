import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const SubscriptionCard = ({
  plan,
  currentPlan,
  onSubscribe,
  loading,
}) => {
  const isCurrentPlan =
    currentPlan === plan.id;

  const isPopular =
    plan.id === "PROFESSIONAL";

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        position: "relative",
        border: isPopular
          ? "2px solid"
          : "1px solid",
        borderColor: isPopular
          ? "primary.main"
          : "divider",
      }}
    >
      {isPopular && (
        <Chip
          label="Most Popular"
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        />
      )}

      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <div>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {plan.name}
            </Typography>

            <Stack
              direction="row"
              alignItems="baseline"
            >
              <Typography
                variant="h3"
                fontWeight={800}
              >
                ₹{plan.price}
              </Typography>

              {plan.price > 0 && (
                <Typography
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  /month
                </Typography>
              )}
            </Stack>
          </div>

          <Divider />

          <Stack spacing={1.5}>
            <Typography>
              ✓ Customer management
            </Typography>

            <Typography>
              ✓ Invoice management
            </Typography>

            <Typography>
              ✓ Payment tracking
            </Typography>

            <Typography>
              ✓ PDF invoices
            </Typography>

            <Typography>
              ✓ Email invoices
            </Typography>

            <Typography>
              ✓{" "}
              {plan.invoiceLimit
                ? `Up to ${plan.invoiceLimit} invoices`
                : "Unlimited invoices"}
            </Typography>
          </Stack>

          <Button
            fullWidth
            size="large"
            variant={
              isPopular
                ? "contained"
                : "outlined"
            }
            disabled={
              plan.id === "FREE" ||
              isCurrentPlan ||
              loading
            }
            onClick={() =>
              onSubscribe(plan.id)
            }
          >
            {isCurrentPlan
              ? "Current Plan"
              : plan.id === "FREE"
                ? "Free Plan"
                : loading
                  ? "Processing..."
                  : "Subscribe"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;