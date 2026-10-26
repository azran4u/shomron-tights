import Typography from "@mui/material/Typography";
import Title from "../components/Title";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { Box, ButtonBase, CircularProgress } from "@mui/material";
import { useCurrentSale } from "../hooks/useCurrentSale";
import { useNavigate } from "react-router-dom";
import FirebaseStorageImage from "../components/FirebaseStorageImage";

const HomePage = () => {
  const title = "טייץ שומרון";
  const subtitle = "טייצים, גרביון ותחרה איכותיים במגוון מידות וצבעים";
  const { featuredProducts } = useFeaturedProducts();
  const { isLoading: saleIsLoading, currentSale: sale } = useCurrentSale();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          px: 2,
          pt: { xs: 2, md: 4 },
          pb: 1,
          maxWidth: 720,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "2.15rem", md: "2.75rem" }, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
        {saleIsLoading ? (
          <CircularProgress size={28} />
        ) : sale ? (
          <Box
            sx={{
              display: "inline-flex",
              px: 2,
              py: 0.6,
              borderRadius: 999,
              bgcolor: "rgba(125, 78, 59, 0.1)",
              color: "primary.main",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {sale.name}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h6" color="error">
            המכירה סגורה כעת
          </Typography>
        )}
      </Box>
      <Title title="המוצרים שלנו" />
      <Box
        sx={{
          display: "grid",
          gap: { xs: 1.5, md: 2 },
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          width: "min(1120px, calc(100% - 2rem))",
          mx: "auto",
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
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: 3,
                  textAlign: "inherit",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 14px 30px rgba(44, 36, 31, 0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f3ebe4",
                      height: { xs: 168, sm: 200 },
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 1.5,
                      py: 2,
                      "& > *": {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      },
                    }}
                  >
                    <FirebaseStorageImage url={product.category_image} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      height: { xs: 88, sm: 72 },
                      textDecoration: "none",
                      color: "inherit",
                      textAlign: "center",
                      fontWeight: 600,
                      lineHeight: 1.35,
                      px: 1.5,
                      overflow: "hidden",
                    }}
                  >
                    {product.display_name}
                  </Typography>
                </Box>
              </ButtonBase>
            );
          })}
      </Box>
    </Box>
  );
};

export default HomePage;
