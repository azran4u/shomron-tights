import React from "react";
import TightsProductPage from "./TightsProductPage";
import { useNavigate, useParams } from "react-router";
import { ProductSchema } from "../model/ProductSchema";
import { Box, Button } from "@mui/material";
import LaceProductPage from "./LaceProductPage";
import ShortProductPage from "./ShortProductPage";
import ThermalProductPage from "./ThermalProductPage";
import { useActiveProducts } from "../hooks/useProducts";

const ProductPage: React.FC = () => {
  const { kind } = useParams<{ kind: string; name: string }>();
  const { products } = useActiveProducts();
  const navigate = useNavigate();

  const backButtonText = "חזרה לקטלוג המוצרים";

  return (
    <Box sx={{ px: { xs: 1, md: 2 } }}>
      {kind && products.length > 0 && (
        <>
          <Button
            variant="text"
            size="small"
            sx={{
              margin: "0.25rem 0.5rem 0",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            {backButtonText}
          </Button>
          {kind === ProductSchema.TIGHTS && <TightsProductPage />}
          {kind === ProductSchema.LACE && <LaceProductPage />}
          {kind === ProductSchema.SHORT && <ShortProductPage />}
          {kind === ProductSchema.THERMAL && <ThermalProductPage />}
        </>
      )}
    </Box>
  );
};
export default ProductPage;
