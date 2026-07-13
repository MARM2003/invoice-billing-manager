import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema } from "../../validations/profile.schema";
import updateProfile from "../../services/user.service"
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth.js"
import {useNavigate} from "react-router-dom"
const CompleteProfileForm = () => {
  const [preview, setPreview] = useState(null);
  const {updateUser} = useAuth()
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: "",
      address: "",
      logo: undefined,
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    setValue("logo", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("phone", data.phone);
      formData.append("address", data.address);

      if (data.logo) {
        formData.append("logo", data.logo);
      }

      const result = await updateProfile(formData);

      if(result) reset();
      updateUser(result.data);

      toast.success("Profile updated successfully",{
        onClose:()=>navigate("/")
      });

      
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#eef2ff 0%,#f8fafc 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Complete Your Profile
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mb={4}
            >
              Complete your company information before creating invoices.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={3}>
                {/* Phone */}

                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="Enter phone number"
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

                {/* Address */}

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Company Address"
                  placeholder="Enter company address"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          alignSelf: "flex-start",
                          mt: 1,
                        }}
                      >
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Logo */}

                <Stack
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    src={preview}
                    sx={{
                      width: 90,
                      height: 90,
                    }}
                  />

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Company Logo

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
                </Stack>

                {/* Submit */}

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.6,
                    fontSize: 16,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Save & Continue
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CompleteProfileForm;