import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const CustomerHeader = ({ onAddCustomer }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Customers
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Manage your customers and billing information.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddCustomer}
        sx={{
          minWidth: { xs: "100%", sm: 180 },
        }}
      >
        Add Customer
      </Button>
    </Stack>
  );
};

export default CustomerHeader;