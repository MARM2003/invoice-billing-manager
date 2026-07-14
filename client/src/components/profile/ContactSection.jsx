import {
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";

const ContactSection = ({ register, errors }) => {
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
        Contact Information
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactSection;