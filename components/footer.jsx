import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="subtitle1">
        &copy; {new Date().getFullYear()} Ganesh Priyatham
      </Typography>
    </Box>
  );
};

export default Footer;
