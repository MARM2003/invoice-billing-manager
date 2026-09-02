import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControlLabel,
    Switch,
    Snackbar,
    Alert,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfileSchema } from "../../validations/profile.schema.js";
import { updateUserProfile, getProfile } from "../../services/user.service.js";

const EditProfileModal = ({ open, onClose, profile, onProfileUpdated }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: "",
            email: "",
            companyName: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            isGstRegistered: false,
            gstNumber: "",
            panNumber: "",
            bankName: "",
            accountHolderName: "",
            accountNumber: "",
            ifscCode: "",
            upiId: "",
        },
    });

    const isGstRegistered = watch("isGstRegistered");

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    /*
     * When the modal opens,
     * populate the form with the current profile data.
     */
    useEffect(() => {
        if (open && profile) {
            reset({
                name: profile.name || "",
                email: profile.email || "",
                companyName: profile.companyName || "",
                phone: profile.phone || "",

                addressLine1: profile.addressLine1 || "",
                addressLine2: profile.addressLine2 || "",
                city: profile.city || "",
                state: profile.state || "",
                country: profile.country || "",
                postalCode: profile.postalCode || "",

                isGstRegistered: profile.isGstRegistered ?? false,
                gstNumber: profile.gstNumber || "",
                panNumber: profile.panNumber || "",

                bankName: profile.bankName || "",
                accountHolderName: profile.accountHolderName || "",
                accountNumber: profile.accountNumber || "",
                ifscCode: profile.ifscCode || "",
                upiId: profile.upiId || "",
            });
        }
    }, [open, profile, reset]);

    /*
     * Submit handler
     */
    // const onSubmit = async (formData) => {
    //     try {
    //         console.log("Submitting profile:", formData);

    //         const response = await updateUserProfileService(formData);

    //         console.log("Profile update response:", response);

    //         /*
    //          * Send updated user back to Settings page
    //          */
    //         if (response?.data) {
    //             onProfileUpdated(response.data);
    //         }

    //         /*
    //          * Close modal after successful update
    //          */
    //         onClose();

    //     } catch (error) {
    //         console.error(
    //             "Failed to update profile:",
    //             error.response?.data || error
    //         );
    //     }
    // };

    const onSubmit = async (data) => {
        try {


            const response = await updateUserProfile(data);

           

            // Update profile data in Settings page
            if (response?.data) {
                onProfileUpdated(response.data);
            }

            // Show success snackbar
            setSnackbar({
                open: true,
                message: "Profile updated successfully!",
                severity: "success",
            });

            // Close modal after successful update
            onClose();

           

        } catch (error) {
            console.error(
                "Failed to update profile:",
                error.response?.data || error
            );

            setSnackbar({
                open: true,
                message:
                    error.response?.data?.message ||
                    "Failed to update profile. Please try again.",
                severity: "error",
            });
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={isSubmitting ? undefined : onClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Edit Profile</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>

                        {/* Name */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Name"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        {/* Company */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                {...register("companyName")}
                                error={!!errors.companyName}
                                helperText={errors.companyName?.message}
                            />
                        </Grid>

                        {/* Phone */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Phone"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>

                        {/* Address */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Address Line 1"
                                {...register("addressLine1")}
                                error={!!errors.addressLine1}
                                helperText={errors.addressLine1?.message}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Address Line 2"
                                {...register("addressLine2")}
                                error={!!errors.addressLine2}
                                helperText={errors.addressLine2?.message}
                            />
                        </Grid>

                        {/* City */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="City"
                                {...register("city")}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                        </Grid>

                        {/* State */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="State"
                                {...register("state")}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                            />
                        </Grid>

                        {/* Country */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Country"
                                {...register("country")}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            />
                        </Grid>

                        {/* Postal Code */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                {...register("postalCode")}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode?.message}
                            />
                        </Grid>

                        {/* GST Registered */}
                        <Grid size={{ xs: 12 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isGstRegistered}
                                        onChange={(event) =>
                                            setValue(
                                                "isGstRegistered",
                                                event.target.checked,
                                                { shouldValidate: true }
                                            )
                                        }
                                    />
                                }
                                label="GST Registered"
                            />

                            {errors.isGstRegistered && (
                                <FormHelperText error>
                                    {errors.isGstRegistered.message}
                                </FormHelperText>
                            )}
                        </Grid>

                        {/* GST Number */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="GST Number"
                                {...register("gstNumber")}
                                disabled={!isGstRegistered}
                                error={!!errors.gstNumber}
                                helperText={errors.gstNumber?.message}
                            />
                        </Grid>

                        {/* PAN */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="PAN Number"
                                {...register("panNumber")}
                                error={!!errors.panNumber}
                                helperText={errors.panNumber?.message}
                            />
                        </Grid>

                        {/* Bank Name */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Bank Name"
                                {...register("bankName")}
                                error={!!errors.bankName}
                                helperText={errors.bankName?.message}
                            />
                        </Grid>

                        {/* Account Holder */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Account Holder Name"
                                {...register("accountHolderName")}
                                error={!!errors.accountHolderName}
                                helperText={errors.accountHolderName?.message}
                            />
                        </Grid>

                        {/* Account Number */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Account Number"
                                {...register("accountNumber")}
                                error={!!errors.accountNumber}
                                helperText={errors.accountNumber?.message}
                            />
                        </Grid>

                        {/* IFSC */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="IFSC Code"
                                {...register("ifscCode")}
                                error={!!errors.ifscCode}
                                helperText={errors.ifscCode?.message}
                            />
                        </Grid>

                        {/* UPI */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="UPI ID"
                                {...register("upiId")}
                                error={!!errors.upiId}
                                helperText={errors.upiId?.message}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    onClose={() =>
                        setSnackbar((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>


    );
};

export default EditProfileModal;