import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

const CustomerToolbar = ({
  search,
  onSearchChange,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
      }}
    >
      <TextField
        fullWidth
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        placeholder="Search customers..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default CustomerToolbar;