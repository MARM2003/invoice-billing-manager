import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

const CustomerEmptyState = ({
  onAddCustomer,
  hasSearch = false,
}) => {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <GroupOutlinedIcon
        sx={{
          fontSize: 80,
          color: "text.disabled",
          mb: 2,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
      >
        {hasSearch
          ? "No customers found"
          : "No customers yet"}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 420,
          mb: 3,
        }}
      >
        {hasSearch
          ? "Try changing your search keywords."
          : "Start by adding your first customer to begin creating invoices."}
      </Typography>

      {!hasSearch && (
        <Button
          variant="contained"
          onClick={onAddCustomer}
        >
          Add Customer
        </Button>
      )}
    </Box>
  );
};

export default CustomerEmptyState;