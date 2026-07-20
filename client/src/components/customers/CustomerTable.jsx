import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CustomerTable = ({
  customers = [],
  loading = false,
  paginationModel,
  onPaginationModelChange,
  rowCount = 0,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      field: "name",
      headerName: "Customer",
      flex: 1.2,
      minWidth: 180,
    },
    {
      field: "companyName",
      headerName: "Company",
      flex: 1,
      minWidth: 180,
      valueGetter: (_, row) => row.companyName || "-",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.4,
      minWidth: 220,
      valueGetter: (_, row) => row.email || "-",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
      valueGetter: (_, row) => row.phone || "-",
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value ? "Active" : "Inactive"}
          color={value ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => onView(row)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit(row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      rows={customers}
      columns={columns}
      loading={loading}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={rowCount}
      pageSizeOptions={[5, 10, 20, 50]}
      disableRowSelectionOnClick
      autoHeight
      sx={{
        border: 0,
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: 600,
        },
      }}
    />
  );
};

export default CustomerTable;