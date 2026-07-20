import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const NotesSection = () => {
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
        Additional Information
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Controller
        name="notes"
        control={control}
        
        render={({ field }) => (
          <TextField
            {...field}
            label="Notes"
            placeholder="Add internal notes about this customer..."
            fullWidth
            multiline
            minRows={4}
            error={!!errors.notes}
            helperText={
              errors.notes?.message ??
              "These notes are for internal use only."
            }
          />
        )}
      />
    </Box>
  );
};

export default NotesSection;