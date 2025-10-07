import React, { useEffect, useState } from "react";
import API from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
} from "@mui/material";
import { SlCloudDownload } from "react-icons/sl";

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    API.get("/payments/all_invoices")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching invoices:", err);
      });
  }, []);

  // Mobile Card View Component
  const MobileInvoiceCard = ({ inv, index }) => (
    <Card className="mb-3" sx={{ boxShadow: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox size="small" />
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <img src="/icons/pdf.svg" alt="pdf" className="w-4 h-4" />
                <Typography variant="body2" fontWeight={600}>
                  {inv.invoice_number}
                </Typography>
              </Box>
              <Chip
                label={inv.due_amount === 0 ? "Paid" : "Pending"}
                size="small"
                sx={{
                  bgcolor: inv.due_amount === 0 ? "#dcfce7" : "#fef9c3",
                  color: inv.due_amount === 0 ? "#15803d" : "#854d0e",
                  fontSize: "0.7rem",
                  height: "20px",
                }}
              />
            </Box>
          </Box>
          <IconButton size="small" color="primary">
            <SlCloudDownload />
          </IconButton>
        </Box>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              User Name
            </Typography>
            <Typography variant="body2">{inv.member}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Due Date
              </Typography>
              <Typography variant="body2">{inv.date}</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Amount
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹ {inv.total_amount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Paper className="rounded-lg" sx={{ p: { xs: 2, sm: 3, md: 6 } }}>
      {/* Header */}
      <Box className="bg-[#F5F5F5] rounded-lg mb-6" sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant={isMobile ? "body1" : "h6"} fontWeight={600}>
          Invoice
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
          Invoice History
        </Typography>
        <Button
          variant="contained"
          className="!bg-[#0E45B6]"
          startIcon={<SlCloudDownload />}
          fullWidth={isMobile}
          size={isMobile ? "medium" : "large"}
        >
          Download All
        </Button>
      </Box>

      {/* Conditional Rendering: Cards for Mobile, Table for Desktop */}
      {isMobile ? (
        <Box>
          {invoices.map((inv, index) => (
            <MobileInvoiceCard key={index} inv={inv} index={index} />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: isTablet ? 600 : 750 }}>
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((inv, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                      <img src="/icons/pdf.svg" alt="pdf" className="w-5 h-5" />
                      <span>{inv.invoice_number}</span>
                      <Chip
                        label={inv.due_amount === 0 ? "Paid" : "Pending"}
                        size="small"
                        sx={{
                          bgcolor: inv.due_amount === 0 ? "#dcfce7" : "#fef9c3",
                          color: inv.due_amount === 0 ? "#15803d" : "#854d0e",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{inv.member}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>₹ {inv.total_amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SlCloudDownload />}
                      sx={{ textTransform: "none" }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          alignItems: "center",
          mt: 3,
          gap: 1,
          fontSize: "0.875rem",
        }}
      >
        <span>Next</span>
        <button className="border rounded p-1 px-2 hover:bg-gray-100">{"<"}</button>
        <button className="border rounded p-1 px-2 hover:bg-gray-100">{">"}</button>
      </Box>
    </Paper>
  );
}
