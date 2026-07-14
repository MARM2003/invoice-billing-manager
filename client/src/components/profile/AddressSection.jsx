import {
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";

const AddressSection = ({ register, errors }) => {
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
        Business Address
      </Typography>

      <Grid container spacing={3}>
        {/* Address Line 1 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Address Line 1"
            placeholder="Street address"
            {...register("addressLine1")}
            error={!!errors.addressLine1}
            helperText={errors.addressLine1?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Address Line 2 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Address Line 2"
            placeholder="Apartment, Suite, Landmark (Optional)"
            {...register("addressLine2")}
            error={!!errors.addressLine2}
            helperText={errors.addressLine2?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* City */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="City"
            placeholder="Enter city"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* State */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="State"
            placeholder="Enter state"
            {...register("state")}
            error={!!errors.state}
            helperText={errors.state?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Country */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Country"
            placeholder="Enter country"
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Postal Code */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Postal Code"
            placeholder="Enter postal code"
            {...register("postalCode")}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MarkunreadMailboxIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddressSection;