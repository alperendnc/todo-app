import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Todo",
    description: "Yapılacak görevlerinizi yönetin ve düzenli kalın.",
    route: "/todo",
  },
  {
    title: "Notes",
    description: "Notlarınızı saklayın ve istediğiniz zaman erişin.",
    route: "/notes",
  },
  {
    title: "Calendar",
    description: "Tarihlere göre plan yapın ve hatırlatıcılar oluşturun.",
    route: "/calendar",
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={3} justifyContent="space-between">
        {features.map((feature) => (
          <Grid key={feature.title}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
              >
                {feature.title}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 2 }}>
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "primary.main",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={() => navigate(feature.route)}
              >
                Daha Fazla
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
