import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const rows = [
  { id: 1, user: "Adam", plan: "Monthly", mob: "9786543210", status: "Expired" },
  { id: 2, user: "Adam", plan: "Monthly", mob: "9786543210", status: "Expired" },
  { id: 3, user: "Adam", plan: "Monthly", mob: "9786543210", status: "Expired" },
  { id: 4, user: "Adam", plan: "Yearly", mob: "9786543210", status: "Expired" },
  { id: 5, user: "Adam", plan: "Monthly", mob: "9786543210", status: "Expired" },
];

export default function ExpiredMemberList() {
  return (
    <Paper className="rounded-lg bg-white p-4">
      <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
        <p className="font-medium">Expired Member List</p>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Mob Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#F9FAFB" } }}>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.mob}</TableCell>
                <TableCell className="text-red-500 font-medium">{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      textTransform: "none",
                      color: "#0E45B6",
                      borderColor: "#0E45B6",
                      "&:hover": {
                        borderColor: "#0E45B6",
                        backgroundColor: "#E5EEFF",
                      },
                    }}
                  >
                    Renew
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
