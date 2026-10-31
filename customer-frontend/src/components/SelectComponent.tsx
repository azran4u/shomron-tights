import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface SelectComponentProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  error?: boolean;
  helperText?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel
        id={`${name}-label`}
        sx={{
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        error={error}
        sx={{ textAlign: "center", bgcolor: "#fff" }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            value={option}
            key={option}
            translate={name === "size" ? "no" : undefined}
            className={name === "size" ? "notranslate" : undefined}
          >
            {name === "size" ? (
              <span translate="no" className="notranslate">
                {option}
              </span>
            ) : (
              option
            )}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default SelectComponent;
