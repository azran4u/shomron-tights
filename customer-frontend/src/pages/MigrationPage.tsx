import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useOrdersCount } from "../hooks/useOrdersCount";
import { useOrders } from "../hooks/useOrders";
import { useDeleteOrderById } from "../hooks/useDeleteOrderById";

const MigrationPage = () => {
  const title = "שרהלה ולירון - אם הגעתן לכאן אתן כנראה לא צריכות להיות כאן";

  const { isLoading, login, logout, error, isLoggedIn, user } = useAuth();

  const { count } = useOrdersCount();

  const { orders } = useOrders();
  const { deleteOrder } = useDeleteOrderById();

  const migrationsHandler = async () => {
    if (!orders || orders.length === 0) return;
    const ordersCountBySaleName: Record<string, number> = {};
    orders.forEach((order) => {
      if (order.saleName) {
        if (!ordersCountBySaleName[order.saleName]) {
          ordersCountBySaleName[order.saleName] = 0;
        }
        ordersCountBySaleName[order.saleName]++;
      }
    });
    console.log("ordersCountBySaleName", ordersCountBySaleName);
    const uniqueSaleNames = Array.from(
      new Set(orders.map((order) => order.saleName))
    );
    console.log("uniqueSaleNames", uniqueSaleNames);
    const salesToDelete = [""];
    const filteredOrders = orders.filter(
      (order) => order.saleName && salesToDelete.includes(order.saleName)
    );
    console.log(filteredOrders);
    console.log("filteredOrders.length", filteredOrders.length);
    for (const order of filteredOrders) {
      const { id } = order;
      if (id) {
        await deleteOrder(id);
        console.log("deleting order", id);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Typography>{error.message}</Typography>}
      {isLoggedIn ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="body1" gutterBottom>
              מחובר: {user?.displayName}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              onClick={logout}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
            >
              (התנתק)
            </Typography>
          </Box>

          {count && (
            <Typography variant="body1" gutterBottom>
              ישנם {count} הזמנות
            </Typography>
          )}
          {/* <button onClick={migrationsHandler}>migrations</button> */}
        </>
      ) : (
        <Button variant="contained" onClick={() => login()}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default MigrationPage;
