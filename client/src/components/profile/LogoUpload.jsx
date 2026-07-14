import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const LogoUpload = ({
  preview,
  setPreview,
  setValue,
  errors,
}) => {

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue("logo", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setPreview(URL.createObjectURL(file));
  };

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
        Company Logo
      </Typography>

      <Stack
        spacing={2}
        alignItems="center"
      >
        <Avatar
          src={preview}
          alt="Company Logo"
          sx={{
            width: 120,
            height: 120,
          }}
        />

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Choose Company Logo

          <input
            hidden
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleLogoChange}
          />
        </Button>

        {errors.logo && (
          <Typography
            color="error"
            variant="body2"
          >
            {errors.logo.message}
          </Typography>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
        >
          Supported formats: JPG, JPEG, PNG
          <br />
          Maximum file size: 2 MB
        </Typography>
      </Stack>
    </Paper>
  );
};

export default LogoUpload;