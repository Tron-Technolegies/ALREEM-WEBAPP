import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PendingList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const open = Boolean(anchorEl);

  // Fetch pending members on mount
  useEffect(() => {
    fetchPendingMembers();
  }, []);

  const fetchPendingMembers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/members/pending_members", { withCredentials: true });
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching pending members:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Menu handlers
  const handleClick = (event, member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  // ✅ Example actions
  const handleViewProfile = () => {
    console.log("View profile:", selectedMember);
    handleClose();
  };

  const handleEdit = () => {
    console.log("Edit member:", selectedMember);
    handleClose();
  };

  const handleInvoice = () => {
    console.log("Download invoice for:", selectedMember);
    handleClose();
  };

  const handleRemove = () => {
    console.log("Remove member:", selectedMember);
    handleClose();
  };

  return (
    <Paper className="rounded-lg bg-white p-4">
      {/* Header */}
      <Box className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
        <Typography fontWeight={600}>Balance Pending</Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="h6" fontWeight={500}>
          Pending Members List
        </Typography>
      </Box>

      {/* Loading state */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : members.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <Typography>No pending members found.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Due Amount (₹)</TableCell>
                <TableCell>Expire Date</TableCell>
                <TableCell>Branch ID</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.email || "N/A"}</TableCell>
                  <TableCell sx={{ color: "red", fontWeight: 600 }}>
                    ₹ {member.due_amount}
                  </TableCell>
                  <TableCell>{member.expire_date || "N/A"}</TableCell>
                  <TableCell>{member.branch_id || "N/A"}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleClick(e, member)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleInvoice}>Invoice</MenuItem>
        <MenuItem onClick={handleRemove} sx={{ color: "red" }}>
          Remove
        </MenuItem>
      </Menu>
    </Paper>
  );
}
