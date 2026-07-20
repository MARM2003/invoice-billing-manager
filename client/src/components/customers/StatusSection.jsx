import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

const StatusSection = () => {
  const { control } = useFormContext();

  return (
    <Box sx={{pt:1,pl:2}} >
      <Typography
        variant="h6"
        fontWeight={600}
       
      >
        Customer Status
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={(event) =>
                  field.onChange(event.target.checked)
                }
                color="primary"
              />
            }
            label={
              field.value
                ? "Active Customer"
                : "Inactive Customer"
            }
          />
        )}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Inactive customers remain in your account but can be
        excluded from future invoicing.
      </Typography>
    </Box>
  );
};

export default StatusSection;