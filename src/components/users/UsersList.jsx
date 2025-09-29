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
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UsersList = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch members from backend
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    API.get("/members/view_members")
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

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <TextField
          label="Search Filters"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          size="small"
        />
        <Link to="/users/add">
          <Button variant="contained" style={{ marginLeft: "10px" }}>
            Add User
          </Button>
        </Link>
      </div>

      {/* Table */}
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
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
    </div>
  );
};

export default UsersList;
