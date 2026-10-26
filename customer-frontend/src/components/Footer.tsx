import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const company = "טייץ שומרון";
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2.5,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {year} © {company}
      </Typography>
    </Box>
  );
};

export default Footer;
