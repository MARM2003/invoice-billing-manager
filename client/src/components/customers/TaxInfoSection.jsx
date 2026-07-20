import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const TaxInfoSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ pt: 1 ,pl:2}}>
      <Typography
        variant="h6"
        fontWeight={600}
       
      >
        Tax Information
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} >
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="gstNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="GST Number"
                placeholder="Enter GST Number"
                fullWidth
                error={!!errors.gstNumber}
                helperText={errors.gstNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tax ID"
                placeholder="Enter Tax ID"
                fullWidth
                error={!!errors.taxId}
                helperText={errors.taxId?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaxInfoSection;