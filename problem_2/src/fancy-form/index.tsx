import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import currencyApi, { CurrencyData } from "../api/currencyApi";
import CurrencySelector from "./CurrencySelector";
import CurrencyConverter from "./CurrencyConverter";
import LoadingScreen from "./LoadingScreen";
import { useThemeContext } from "../context/ThemeContext"; 
import SnowfallBG from "../layout/SnowfallBG";

const CurrencySwapForm: React.FC = () => {
  const [tokenList, setTokenList] = useState<CurrencyData[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const { toggleTheme, mode } = useThemeContext(); // Lấy theme và hàm đổi mode

  useEffect(() => {
    currencyApi
      .getAll()
      .then((data) => {
        setTokenList(data);

        if (data?.length >= 2) {
          setFromCurrency(data[0].currency);
          setToCurrency(data.find((t) => t.currency !== data[0].currency)?.currency || "");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch currency list:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tokenList?.length > 0) {
      const fromRate = tokenList.find((t) => t.currency === fromCurrency)?.price || 1;
      const toRate = tokenList.find((t) => t.currency === toCurrency)?.price || 1;
      setExchangeRate(toRate / fromRate);
      setConvertedAmount(amount * (toRate / fromRate));
    }
  }, [fromCurrency, toCurrency, amount, tokenList]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px" }}>
      <SnowfallBG snowColor={mode === "dark" ? "#ffffff" : "#577BC1"} />
      <Paper
        elevation={3}
        sx={{
          padding: "25px",
          borderRadius: "15px",
          minHeight: "20rem",
          bgcolor: mode === "dark" ? "background.paper" : "white",
          color: mode === "dark" ? "text.primary" : "inherit",
          backdropFilter: mode === "dark" ? "blur(10px)" : "none",
          border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {loading ? (
          <LoadingScreen message="Fetching currency data..." />
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            <Box sx={{ width: "280px", margin: "0 auto" }}>
              <img
                src="/undraw_welcome-cats_tw36.svg"
                alt="Welcome Cats"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "primary.main"}}>
              Welcome To Fancy Form 
            </Typography>

            <Typography variant="body2" align="center" sx={{ color: "text.secondary"}}>
              A simple and interactive Currency Exchange form to convert values between different currencies easily.
            </Typography>

            <CurrencyConverter
              amount={amount}
              convertedAmount={convertedAmount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              exchangeRate={exchangeRate}
              onAmountChange={setAmount}
            />

            <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" gap={2}>
              <Box display="flex" flexDirection="column">
                <Typography variant="caption">From Currency</Typography>
                <CurrencySelector label="" value={fromCurrency} onChange={setFromCurrency} options={tokenList} />
              </Box>

              <IconButton onClick={swapCurrencies}>
                <SwapHorizIcon fontSize="large" />
              </IconButton>

              <Box display="flex" flexDirection="column">
                <Typography variant="caption">To Currency</Typography>
                <CurrencySelector 
                  label="" 
                  value={toCurrency} 
                  onChange={setToCurrency} 
                  options={tokenList} 
                  disabledOptions={[fromCurrency]} // Disable loại tiền đã chọn ở FromCurrency
                />
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CurrencySwapForm;
