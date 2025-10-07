import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

export default function ExpiredMemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expired members on component mount
  useEffect(() => {
    fetchExpiredMembers();
  }, []);

  const fetchExpiredMembers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/members/expired_members", { withCredentials: true });
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching expired members:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="rounded-lg bg-white p-4">
      {/* Header */}
      <Box className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
        <Typography fontWeight={500}>Expired Member List</Typography>
      </Box>

      {/* Loading state */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : members.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <Typography>No expired members found.</Typography>
        </Box>
      ) : (
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
              {members.map((member) => (
                <TableRow
                  key={member.id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#F9FAFB" } }}
                >
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.plan_type || "N/A"}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell className="text-red-500 font-medium">Expired</TableCell>
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
                      onClick={() => console.log("Renew member:", member)}
                    >
                      Renew
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
