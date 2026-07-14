import { useState } from "react";
import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import TaxSection from "./TaxSection";
import LogoUpload from "./LogoUpload";

import { profileSchema } from "../../validations/profile.schema";

import updateProfile from "../../services/user.service";

import useAuth from "../../hooks/useAuth";

const CompleteProfileForm = () => {
  const navigate = useNavigate();

  const { updateUser } = useAuth();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      phone: "",

      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",

      isGstRegistered: false,
      gstNumber: "",

      logo: undefined,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("phone", data.phone);

      formData.append("addressLine1", data.addressLine1);
      formData.append("addressLine2", data.addressLine2);

      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("country", data.country);
      formData.append("postalCode", data.postalCode);

      formData.append("isGstRegistered", data.isGstRegistered);

      if (data.isGstRegistered) {
        formData.append("gstNumber", data.gstNumber);
      }

      if (data.logo) {
        formData.append("logo", data.logo);
      }

      const result = await updateProfile(formData);

      updateUser(result.data);

      reset();

      toast.success("Profile completed successfully.", {
        onClose: () => navigate("/"),
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to complete profile."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 5,
        background:
          "linear-gradient(135deg,#eef2ff 0%,#f8fafc 100%)",
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
                md: 5,
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              align="center"
              gutterBottom
            >
              Complete Business Profile
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              mb={4}
            >
              Complete your business information before creating professional invoices.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={3}>
                <ContactSection
                  register={register}
                  errors={errors}
                />

                <AddressSection
                  register={register}
                  errors={errors}
                />

                <TaxSection
                  register={register}
                  errors={errors}
                  watch={watch}
                />

                <LogoUpload
                  preview={preview}
                  setPreview={setPreview}
                  setValue={setValue}
                  errors={errors}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.7,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 16,
                    textTransform: "none",
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