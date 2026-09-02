import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import ProfileHeader from "../../components/settings/ProfileHeader.jsx";
import PersonalInformation from "../../components/settings/PersonalInformation.jsx";
import BusinessInformation from "../../components/settings/BusinessInformation.jsx";
import AddressInformation from "../../components/settings/AddressInformation.jsx";
import PaymentInformation from "../../components/settings/PaymentInformation.jsx";
import EditProfileModal from "../../components/settings/EditProfileModal.jsx";

import { getProfile } from "../../services/user.service.js";

const SettingsPage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);


    const handleProfileUpdated = (updatedProfile) => {

        setProfile(updatedProfile);
    };
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                // Replace this with your actual service
                const response = await getProfile();

                setProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);

                setError(
                    error?.response?.data?.message ||
                    "Failed to load profile information."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!profile) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info">
                    No profile information found.
                </Alert>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
            }}
        >
            {/* Page Heading */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        fontSize: {
                            xs: "1.6rem",
                            sm: "2rem",
                            md: "2.2rem",
                        },
                    }}
                >
                    Settings
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Manage your profile and business information.
                </Typography>
            </Box>

            <Stack spacing={3}>
                {/* <ProfileHeader profile={profile} /> */}
                <ProfileHeader
                    profile={profile}
                    onEditProfile={() => setEditModalOpen(true)}
                />
                <PersonalInformation profile={profile} />

                <BusinessInformation profile={profile} />

                <AddressInformation profile={profile} />

                <PaymentInformation profile={profile} />

                <EditProfileModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    profile={profile}
                    onProfileUpdated={handleProfileUpdated}
                />
            </Stack>
        </Container>
    );
};

export default SettingsPage;