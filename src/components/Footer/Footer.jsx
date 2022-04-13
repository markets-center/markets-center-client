import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "10vh",
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
        <Container maxWidth="xs">
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="/home">
              Markets Center
            </Link>
            {" "}
            {"2022"}
            {"."}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
