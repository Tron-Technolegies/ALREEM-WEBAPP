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

const PlansList = () => {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const navigate = useNavigate();

  // Fetch plans from backend
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    API.get("/members/view_plans")
      .then((res) => {
        console.log("Fetched plans data:", res.data); // For debugging
        setPlans(Array.isArray(res.data.plans) ? res.data.plans : []);
      })
      .catch((err) => {
        console.error("Error fetching plans:", err);
        setPlans([]);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await API.delete(`/plans/delete_plan/${id}`);
      setPlans(plans.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  // Menu handling
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlanId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPlanId(null);
  };

  const handleEdit = () => {
    navigate(`/plans/${selectedPlanId}/edit`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleDelete(selectedPlanId);
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

  const filteredRows = plans.filter(
    (row) =>
      row.name?.toLowerCase().includes(filter.toLowerCase()) ||
      row.description?.toLowerCase().includes(filter.toLowerCase()) ||
      row.price?.toString().includes(filter)
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
        <Link to="/plans/add">
          <Button variant="contained" style={{ marginLeft: "10px" }}>
            Add Plan
          </Button>
        </Link>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="plans table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Duration</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price || "N/A"}</TableCell>
                <TableCell>{row.duration_days || "N/A"}</TableCell>

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

export default PlansList;
