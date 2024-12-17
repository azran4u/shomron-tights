import Typography from "@mui/material/Typography";
import Title from "../components/Title";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { Box, ButtonBase, CircularProgress } from "@mui/material";
import { useMobile } from "../hooks/useMobile";
import { useCurrentSale } from "../hooks/useCurrentSale";
import { useNavigate } from "react-router-dom";
import FirebaseStorageImage from "../components/FirebaseStorageImage";

const HomePage = () => {
  const title = "טייץ שומרון";
  const subtitle = "טייצים, גרביון ותחרה איכותיים במגוון מידות וצבעים";
  const { featuredProducts } = useFeaturedProducts();
  const isMobile = useMobile();
  const { isLoading: saleIsLoading, currentSale: sale } = useCurrentSale();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "15vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ margin: "0 auto" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ margin: "0 auto" }}>
        {subtitle}
      </Typography>
      {saleIsLoading ? (
        <CircularProgress sx={{ margin: "0 auto" }} />
      ) : sale ? (
        <Typography variant="h5" gutterBottom sx={{ margin: "0 auto" }}>
          {sale.name}
        </Typography>
      ) : (
        <Typography
          variant="h5"
          color="error"
          gutterBottom
          sx={{ margin: "0 auto" }}
        >
          המכירה סגורה כעת
        </Typography>
      )}
      <Title title="המוצרים שלנו" />
      <Box
        sx={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: isMobile ? "" : "repeat(5, 1fr)",
          margin: "1rem auto 0 auto",
          width: "90vw",
        }}
      >
        {featuredProducts &&
          featuredProducts.map((product) => {
            return (
              <ButtonBase
                onClick={() => {
                  navigate(`/product/${product.kind}/${product.name}`);
                }}
                key={product.id}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <FirebaseStorageImage url={product.category_image} />
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {product.display_name}
                  </Typography>
                </Box>
              </ButtonBase>
            );
          })}
        <br />
      </Box>
    </Box>
  );
};

export default HomePage;
