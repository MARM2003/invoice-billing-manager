import PropTypes from "prop-types";
import {
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import { Controller } from "react-hook-form";
import { INVOICE_STATUS } from "../../../utils/invoiceStatus";

const GeneralInfoSection = ({ control }) => {
    return (
        <Grid container spacing={2}>

            {/* Status */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="status"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            select
                            label="Status"
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        >
                            {Object.entries(INVOICE_STATUS).map(([value, config]) => (
                                <MenuItem
                                    key={value}
                                    value={value}
                                >
                                    {config.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            </Grid>

            {/* Issue Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="issueDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            type="date"
                            label="Issue Date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>

            {/* Due Date */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            type="date"
                            label="Due Date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

GeneralInfoSection.propTypes = {
    control: PropTypes.object.isRequired,
};

export default GeneralInfoSection;