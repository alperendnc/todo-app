"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import ContinuousCalendar from "src/components/Calendar/ContinuousCalendar";

interface DemoWrapperProps {
  children?: React.ReactNode;
}

const DemoWrapper: React.FC<DemoWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1, sm: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: "100%", sm: 600, md: 800 },
          minHeight: 500,
          maxHeight: "90vh",
          height: 650,
          overflow: "auto",
          p: { xs: 1, sm: 3 },
          mt: { xs: 8, sm: 10 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children ?? <ContinuousCalendar />}
      </Paper>
    </Box>
  );
};

export default DemoWrapper;
