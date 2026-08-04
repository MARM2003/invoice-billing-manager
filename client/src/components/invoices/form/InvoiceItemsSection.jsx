import PropTypes from "prop-types";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Controller } from "react-hook-form";

const InvoiceItemsSection = ({
    control,
    fields,
    append,
    remove,
}) => {
    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
            >
                Invoice Items
            </Typography>

            {fields.map((field, index) => (
                <Paper
                    key={field.id}
                    variant="outlined"
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        {/* Description */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name={`items.${index}.description`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Quantity */}
                        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                            <Controller
                                name={`items.${index}.quantity`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Quantity"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Unit Price */}
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <Controller
                                name={`items.${index}.unitPrice`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Unit Price"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>

                         {/* Unit Price */}
                        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                            <Controller
                                name={`items.${index}.taxRate`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Tax %"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Delete Button */}
                        <Grid
                            size={{ xs: 12, sm: 4, md: 1 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton
                                color="error"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                    append({
                        description: "",
                        quantity: 1,
                        unitPrice: "",
                    })
                }
            >
                Add Item
            </Button>
        </Box>
    );
};

InvoiceItemsSection.propTypes = {
    control: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    append: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

export default InvoiceItemsSection;