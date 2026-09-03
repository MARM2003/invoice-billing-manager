import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Typography,
    Box,
    Alert,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { updateUserLogo } from "../../services/user.service.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
];

const UpdateLogoModal = ({
    open,
    onClose,
    profile,
    onProfileUpdated,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!open) {
            setSelectedFile(null);
            setPreview(null);
            setError("");
        }
    }, [open]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Only JPG, JPEG and PNG files are allowed.");
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setError("Logo size must be less than 2 MB.");
            return;
        }

        setSelectedFile(file);

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a logo first.");
            return;
        }

        try {
            setIsUploading(true);
            setError("");

            const formData = new FormData();

            formData.append("logo", selectedFile);

            const response = await updateUserLogo(formData);

            console.log("Logo update response:", response);

            if (response?.data) {
                onProfileUpdated(response.data);
            }

            onClose();

        } catch (error) {
            console.error(
                "Failed to update logo:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update logo. Please try again."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={isUploading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Update Logo
            </DialogTitle>

            <DialogContent>

                {/* Preview */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        py: 3,
                    }}
                >
                    <Avatar
                        src={preview || profile?.logo || undefined}
                        alt="Company Logo"
                        sx={{
                            width: 140,
                            height: 140,
                            fontSize: "3rem",
                        }}
                    >
                        {!preview &&
                            !profile?.logo &&
                            profile?.companyName?.charAt(0)}
                    </Avatar>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {preview
                            ? "New logo preview"
                            : "Current logo"}
                    </Typography>
                </Box>

                {/* File picker */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                    >
                        Choose Logo

                        <input
                            type="file"
                            hidden
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>

                {/* File information */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mt: 2 }}
                >
                    Supported formats: JPG, JPEG, PNG
                    <br />
                    Maximum file size: 2 MB
                </Typography>

                {/* Selected file */}
                {selectedFile && (
                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{ mt: 2 }}
                    >
                        Selected: {selectedFile.name}
                    </Typography>
                )}

                {/* Error */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mt: 2 }}
                    >
                        {error}
                    </Alert>
                )}

            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    disabled={isUploading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading
                        ? "Uploading..."
                        : "Upload Logo"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateLogoModal;