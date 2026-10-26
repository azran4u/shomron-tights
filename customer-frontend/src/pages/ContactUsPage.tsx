import Typography from "@mui/material/Typography";
import { Box, Card, CardContent } from "@mui/material";
import { useMobile } from "../hooks/useMobile";
import { useMemo } from "react";
import { useContact } from "../hooks/useContact";

const ContacUsPage = () => {
  const title = "טייץ שומרון";
  const subtitle = "צרי קשר";
  const { contacts } = useContact();
  const isMobile = useMobile();
  const cardWidth = useMemo(() => (isMobile ? "90vw" : "50vw"), [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        pt: 3,
        pb: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "1.5rem auto 0 auto",
          width: cardWidth,
        }}
      >
        {contacts &&
          contacts.map((contact) => {
            return (
              <Card key={contact.id} sx={{ borderRadius: "5px" }}>
                <CardContent>
                  <Typography variant="h6">
                    {contact.first_name} {contact.last_name}
                  </Typography>
                  <Typography variant="body1">
                    {contact.street}, {contact.city}
                  </Typography>
                  <Typography variant="body1">
                    {contact.phone_number}
                  </Typography>
                  <Typography variant="body1">{contact.email}</Typography>
                  <Typography variant="body1">
                    <a href={contact.paybox_link}>PayBox</a>
                  </Typography>
                  <Typography variant="body1">
                    <a href={contact.bit_link}>Bit</a>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </Box>
      <br />
    </Box>
  );
};

export default ContacUsPage;
