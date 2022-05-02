import { Typography, Container, Link, Box } from "@mui/material";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 3,
          mt: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="xs" sx={{display: 'flex',
          justifyContent: 'center',}}>
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="/">
              Markets Center
            </Link>
            {" "}
            {"2022"}
            {"."}
          </Typography>
        </Container>
      </Box>
    </Box>
    </div>
  );
}
