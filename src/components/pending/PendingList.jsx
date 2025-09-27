import React from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const rows = [
  {
    id: 1,
    user: "Adam",
    plan: "Monthly",
    mob: "9786543210",
    amount: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
  },
  {
    id: 2,
    user: "Adam",
    plan: "Monthly",
    mob: "9786543210",
    amount: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
  },
  {
    id: 3,
    user: "Adam",
    plan: "Monthly",
    mob: "9786543210",
    amount: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
  },
  {
    id: 4,
    user: "Adam",
    plan: "Yearly",
    mob: "9786543210",
    amount: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
  },
  {
    id: 5,
    user: "Adam",
    plan: "Monthly",
    mob: "9786543210",
    amount: "₹ 3000",
    paid: "₹ 2000",
    pending: "₹ 1000",
  },
];

export default function PendingList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <Paper className="rounded-lg bg-white p-4">
      {/* Header */}
      <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
        <p className="font-semibold">Balance Pending</p>
      </div>
      <div className="mb-2">
        <p className="text-lg font-medium">Pending List</p>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Mob Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.mob}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.paid}</TableCell>
                <TableCell>{row.pending}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleClick(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>View Profile</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Invoice</MenuItem>
        <MenuItem onClick={handleClose} className="!text-red-500">
          Remove
        </MenuItem>
      </Menu>
    </Paper>
  );
}
