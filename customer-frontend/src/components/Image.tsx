import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  url?: string;
  size?: "small" | "medium" | "large";
}

const Image: React.FC<Props> = ({ url, size }) => {
  const sizes = {
    small: "5rem",
    medium: "10rem",
    large: "20rem",
  };
  const sizeRem = sizes[size || "medium"] ?? sizes.medium;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {url ? (
        <Box
          component="img"
          src={url}
          alt="Image"
          loading="lazy"
          sx={{
            height: sizeRem,
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <Box>
          <Typography>טוען תמונה...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Image;
