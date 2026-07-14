import {
  Paper,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const TaxSection = ({ register, errors, watch }) => {
  const isGstRegistered = watch("isGstRegistered");

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={3}
      >
        Tax Information
      </Typography>

      <Grid container spacing={3}>
        {/* GST Registered */}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register("isGstRegistered")}
              />
            }
            label="I am GST Registered"
          />
        </Grid>

        {/* GST Number */}

        {isGstRegistered && (
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="GST Number"
              placeholder="Enter GST Number"
              {...register("gstNumber")}
              error={!!errors.gstNumber}
              helperText={errors.gstNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptLongIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default TaxSection;