import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";

interface CurrencyConverterProps {
  amount: number;
  convertedAmount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  onAmountChange: (newAmount: number) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  amount,
  convertedAmount,
  fromCurrency,
  toCurrency,
  exchangeRate,
  onAmountChange,
}) => {

  const [amountState, setAmountState] = useState<number| null>(1);

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const parsedValue = parseFloat(value);
    

    if (value === "") {
      setAmountState(null);
      setError("Can not be empty");
      return;
    }

    if (isNaN(parsedValue)) {
      setError("Please enter a valid number");
      return;
    }
    

    if (parsedValue < 1) {
      setError("Amount must be at least 1");
      return;
    }
    setAmountState(parsedValue);
    onAmountChange(parsedValue);


    setError("");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Enter amount */}
      <TextField
        fullWidth
        type="number"
        label="Amount"
        value={amountState || ""}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        InputProps={{
          inputProps: { min: 1 },
          style: { appearance: "textfield" },
        }}
        sx={{
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        }}
      />

      {/* Display result */}
      <Typography align="center" sx={{ color: "green", fontWeight: "bold" }}>
        {isNaN(amount) ? 1 : amount.toLocaleString()} {fromCurrency} = {convertedAmount.toLocaleString()} {toCurrency}
      </Typography>
      <Typography align="center" variant="caption" sx={{ color: "gray" }}>
        Market exchange rate: {exchangeRate.toFixed(5)}
      </Typography>
    </Box>
  );
};

export default CurrencyConverter;
