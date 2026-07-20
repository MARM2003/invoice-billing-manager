import { Box, Typography } from "@mui/material";

const DetailItem = ({ label, value }) => {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        gutterBottom
      >
        {label}
      </Typography>

      <Typography variant="body1">
        {value || "-"}
      </Typography>
    </Box>
  );
};

export default DetailItem;