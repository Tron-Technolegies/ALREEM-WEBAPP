import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function createData(date, user, checkin, checkout, daysleft) {
  return { date, user, checkin, checkout, daysleft };
}

const rows = [
  createData("29 July 2025", "1150 - Adam", "09:00am", "12:00pm", "19d"),
  createData("29 July 2025", "1150 - Adam", "10:30am", "12:00pm", "19d"),
  createData("29 July 2025", "1150 - Adam", "00:00", "12:00pm", "19d"),
  createData("29 July 2025", "1150 - Adam", "09:00am", "12:00pm", "19d"),
];

export default function AttendanceOverview() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Header */}
      <div className="bg-[#F5F5F5] flex justify-between items-center rounded-lg p-4 mb-4">
        <p className="font-semibold">Attendance</p>
        <button className="border px-3 py-1 rounded-md text-gray-600">29 July 2025</button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Days left</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.checkin}</TableCell>
                <TableCell>{row.checkout}</TableCell>
                <TableCell>{row.daysleft}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Invoice</MenuItem>
                    <MenuItem onClick={handleClose} sx={{ color: "red" }}>
                      Remove
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>Page 1 of 100</p>
        <div className="flex space-x-2">
          <button className="border px-2 rounded">&lt;</button>
          <button className="border px-2 rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
}
