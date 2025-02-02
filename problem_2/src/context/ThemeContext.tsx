import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider, Theme, CssBaseline } from "@mui/material";

// Tạo context cho theme
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#4caf50", 
      },
      background: {
        default: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
        paper: mode === "dark" ? "rgba(80, 80, 80, 0.6)" : "#ffffff", 
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#b3b3b3" : "#4d4d4d",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProviderWrapper");
  return context;
};
