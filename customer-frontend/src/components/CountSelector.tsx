import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface CountSelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CountSelector: React.FC<CountSelectorProps> = ({
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 999,
        bgcolor: "#fff",
      }}
    >
      <Button
        variant="text"
        onClick={onDecrement}
        disabled={value <= 1}
        sx={{ minWidth: 44, borderRadius: 999 }}
      >
        -
      </Button>
      <Typography
        variant="body1"
        sx={{ minWidth: 28, textAlign: "center", fontWeight: 600 }}
      >
        {value}
      </Typography>
      <Button
        variant="text"
        onClick={onIncrement}
        sx={{ minWidth: 44, borderRadius: 999 }}
      >
        +
      </Button>
    </Box>
  );
};

export default CountSelector;
