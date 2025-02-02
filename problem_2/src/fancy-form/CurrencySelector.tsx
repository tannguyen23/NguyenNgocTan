import React from "react";
import { TextField, Box, Avatar, Autocomplete } from "@mui/material";
import { CurrencyData } from "../api/currencyApi";

interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (newCurrency: string) => void;
  options: CurrencyData[];
  disabledOptions?: string[]; 
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ label, value, onChange, options, disabledOptions = [] }) => {
  return (
    <Autocomplete
      sx={{ minWidth: "10rem" }}
      options={options}
      getOptionLabel={(option) => option.currency}
      value={options.find((t) => t.currency === value) || null}
      onChange={(_, newValue) => onChange(newValue?.currency || "")}
      renderOption={(props, option) => (
        <Box 
          component="li" 
          {...props} 
          key={option.currency} 
          display="flex" 
          alignItems="center"
          sx={{ opacity: disabledOptions.includes(option.currency) ? 0.5 : 1, pointerEvents: disabledOptions.includes(option.currency) ? "none" : "auto" }} // 🔹 Disable option
        >
          <Avatar
            src={`/tokens/${option.currency}.svg`}
            alt={option.currency}
            sx={{ width: 24, height: 24, marginRight: 1 }}
          />
          {option.currency}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            startAdornment: value && (
              <Avatar
                src={`/tokens/${value}.svg`}
                alt={value}
                sx={{ width: 24, height: 24, marginRight: 1 }}
              />
            ),
          }}
        />
      )}
    />
  );
};

export default CurrencySelector;
