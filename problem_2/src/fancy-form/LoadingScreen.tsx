import React from "react";
import { Box, CircularProgress, Typography, SxProps, Theme } from "@mui/material";

interface LoadingScreenProps {
  message?: string;
  sx?: SxProps<Theme>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading data...", sx }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ padding: "40px" }}>
      <CircularProgress color="success" />
      <Typography variant="body2" sx={{ marginTop: "10px", color: "gray", ...sx }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
