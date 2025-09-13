import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function createData(user, plan, mobNumber, dueAmount, leave, rejoin, expire, status) {
  return { user, plan, mobNumber, dueAmount, leave, rejoin, expire, status };
}

const rows = [
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Active'),
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Active'),
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
  createData('Adam', 'Monthly', '9786543210', 'N/A', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
  createData('Adam', 'Yearly', '9786543210', 'N/A', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
  createData('Adam', 'Monthly', '9786543210', 'N/A', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Active'),
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Active'),
  createData('Adam', 'Monthly', '9786543210', '₹1000', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
  createData('Adam', 'Monthly', '9786543210', 'N/A', '22/8/2025', 'N/A', '10/10/2025', 'Expired'),
];

const UsersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(row =>
    row.user.toLowerCase().includes(filter.toLowerCase()) ||
    row.plan.toLowerCase().includes(filter.toLowerCase()) ||
    row.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Search bar and button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <TextField
          label="Search Filters"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          size="small"
        />
        <Button variant="contained" style={{ marginLeft: '10px' }}>Add User</Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Mob Number</TableCell>
              <TableCell>Due Amount</TableCell>
              <TableCell>Leave</TableCell>
              <TableCell>Rejoin</TableCell>
              <TableCell>Expire</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.mobNumber + row.leave}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.user}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.mobNumber}</TableCell>
                <TableCell>{row.dueAmount}</TableCell>
                <TableCell>{row.leave}</TableCell>
                <TableCell>{row.rejoin}</TableCell>
                <TableCell>{row.expire}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
