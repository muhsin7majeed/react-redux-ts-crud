import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Container>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            React CRUD
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
