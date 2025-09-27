import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { SlCloudDownload } from "react-icons/sl";

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from Django backend
  useEffect(() => {
    fetch("https://alreem-7r91.onrender.com/payments/all_invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  return (
    <Paper className="p-6 rounded-lg ">
      {/* Header */}
      <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6">
        <p className="text-lg font-semibold">Invoice</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoice History</h2>
        <Button
          variant="contained"
          className="!bg-[#0E45B6] flex items-center gap-2"
          startIcon={<SlCloudDownload />}
        >
          Download All
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell></TableCell>
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
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src="/icons/pdf.svg" alt="pdf" className="w-5 h-5" />
                    <span>{inv.invoice_number}</span>
                    <span
                      className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        inv.due_amount === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {inv.due_amount === 0 ? "Paid" : "Pending"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{inv.member}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell>₹ {inv.total_amount}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SlCloudDownload />}
                    className="normal-case"
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2 text-sm">
        <span>Next</span>
        <button className="border rounded p-1 px-2 hover:bg-gray-100">{"<"}</button>
        <button className="border rounded p-1 px-2 hover:bg-gray-100">{">"}</button>
      </div>
    </Paper>
  );
}
