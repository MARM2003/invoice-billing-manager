import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AddressSection = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const billingAddress = watch("billingAddress");
  const sameAsBilling = watch("sameAsBilling", false);

  useEffect(() => {
    if (sameAsBilling) {
      setValue("shippingAddress", billingAddress, {
        shouldValidate: true,
      });
    }
  }, [billingAddress, sameAsBilling, setValue]);

  return (
    <Box sx={{ pt: 1 ,pl:2}}>
      <Typography
        variant="h6"
        fontWeight={600}
       
      >
        Addresses
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} >
        <Grid size={{ xs: 12 }}>
          <Controller
            name="billingAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Billing Address"
                placeholder="Enter billing address"
                fullWidth
                multiline
                minRows={3}
                error={!!errors.billingAddress}
                helperText={errors.billingAddress?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="sameAsBilling"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.checked)
                    }
                  />
                }
                label="Shipping address is the same as billing address"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="shippingAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Shipping Address"
                placeholder="Enter shipping address"
                fullWidth
                multiline
                minRows={3}
                disabled={sameAsBilling}
                error={!!errors.shippingAddress}
                helperText={errors.shippingAddress?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressSection;