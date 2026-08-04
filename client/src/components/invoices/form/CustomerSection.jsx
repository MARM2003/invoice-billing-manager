import PropTypes from "prop-types";

import {
    Autocomplete,
    CircularProgress,
    Grid,
    TextField,
} from "@mui/material";

const CustomerSection = ({
    customers,
    value,
    loading,
    inputValue,
    onChange,
    onInputChange,
    error,
    helperText,
}) => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Autocomplete
                    options={customers}
                    loading={loading}
                    value={value}
                    inputValue={inputValue}
                    onChange={onChange}
                    onInputChange={onInputChange}
                    getOptionLabel={(option) => option?.name ?? ""}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="No customers found"
                    loadingText="Searching customers..."
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Customer"
                            placeholder="Search customer..."
                            error={error}
                            helperText={helperText}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

CustomerSection.propTypes = {
    customers: PropTypes.array.isRequired,

    value: PropTypes.object,

    loading: PropTypes.bool,

    inputValue: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired,

    onInputChange: PropTypes.func.isRequired,

    error: PropTypes.bool,

    helperText: PropTypes.string,
};

CustomerSection.defaultProps = {
    value: null,
    loading: false,
    error: false,
    helperText: "",
};

export default CustomerSection;