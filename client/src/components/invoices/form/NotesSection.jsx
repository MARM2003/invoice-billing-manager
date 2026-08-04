import PropTypes from "prop-types";
import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

import { Controller } from "react-hook-form";

const NotesSection = ({ control }) => {
    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
            >
                Notes
            </Typography>

            <Controller
                name="notes"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Notes"
                        placeholder="Add any additional notes for the customer..."
                        multiline
                        rows={4}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
        </Box>
    );
};

NotesSection.propTypes = {
    control: PropTypes.object.isRequired,
};

export default NotesSection;