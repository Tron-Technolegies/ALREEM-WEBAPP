import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UsersList = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch members from backend
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    API.get("/members/view_members", { withCredentials: true })
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Error fetching members:", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/members/delete_member/${id}`);
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const res = await API.get(`/members/download_invoice/${id}/`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading invoice:", err);
    }
  };

  // Menu handling
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleEdit = () => {
    navigate(`/users/${selectedUserId}/edit`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleDelete(selectedUserId);
    handleMenuClose();
  };

  const handleDownloadClick = () => {
    handleDownloadInvoice(selectedUserId);
    handleMenuClose();
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const filteredRows = members.filter(
    (row) =>
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.plan_type.toLowerCase().includes(filter.toLowerCase()) ||
      row.status.toLowerCase().includes(filter.toLowerCase())
  );

  // Mobile Card View
  const MobileCardView = ({ row }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
          <Typography variant="h6" component="div">
            {row.name}
          </Typography>
          <IconButton onClick={(e) => handleMenuClick(e, row.id)} size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Plan:
            </Typography>
            <Typography variant="body1">{row.plan_type}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Phone:
            </Typography>
            <Typography variant="body1">{row.phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Due Amount:
            </Typography>
            <Typography variant="body1">{row.due_amount || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <Typography variant="body1">{row.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Leave:
            </Typography>
            <Typography variant="body1">{row.leave_date || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Rejoin:
            </Typography>
            <Typography variant="body1">{row.rejoin_date || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Expire:
            </Typography>
            <Typography variant="body1">{row.expire_date}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif", p: { xs: 1, sm: 2 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 0 },
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search Filters"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          size="small"
          fullWidth={isMobile}
        />
        <Link to="/users/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{ marginLeft: { sm: "10px" }, minWidth: { xs: "100%", sm: "auto" } }}
          >
            Add User
          </Button>
        </Link>
      </Box>

      {/* Conditional rendering: Cards for mobile, Table for desktop */}
      {isMobile ? (
        <Box>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <MobileCardView key={row.id} row={row} />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Due Amount</TableCell>
                <TableCell>Leave</TableCell>
                <TableCell>Rejoin</TableCell>
                <TableCell>Expire</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.plan_type}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.due_amount || "N/A"}</TableCell>
                    <TableCell>{row.leave_date || "N/A"}</TableCell>
                    <TableCell>{row.rejoin_date || "N/A"}</TableCell>
                    <TableCell>{row.expire_date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Menu for actions */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        <MenuItem onClick={handleDownloadClick}>Download</MenuItem>
      </Menu>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UsersList;
