import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const NavBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
