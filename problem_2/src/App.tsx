import React from "react";
import FancyForm from "./fancy-form";
import { ThemeProviderWrapper, useThemeContext } from "./context/ThemeContext";
import { Box } from "@mui/material";

const AppContent: React.FC = () => {
  const { mode } = useThemeContext();

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        backgroundImage: mode === "dark" ? "url('/bg_dark.jpg')" : "url('/bg_light.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background 0.3s ease-in-out", 
      }}
    >
      <FancyForm />
    </Box>
  );
};

function App() {
  return (
    <ThemeProviderWrapper>
      <AppContent />
    </ThemeProviderWrapper>
  );
}

export default App;
