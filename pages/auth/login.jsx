import { useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Box,
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { signIn } from "next-auth/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

  const styles = {
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(/login-bg.jpg)",
      backgroundRepeat: "no-repeat",

      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    avatar: {
      margin: "8px",
      backgroundColor: "#f50057",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
    },
    form: {
      margin: "32px",
    },
    submit: {
      margin: "48px 0 32px",
    },
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
      userType: userType,
    });

    console.log(result);

    // if (result.error) {
    //   alert("Login failed. Please try again.");
    // } else {
    //   router.push("/home");
    // }
  };

  return (
    <Grid container component="main" style={styles.root}>
      <Grid item xs={false} sm={4} md={7} style={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Box} mt={8}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Buyer" />
            <Tab label="Seller" />
            <Tab label="Advertiser" />
          </Tabs>
        </AppBar>
        <Box style={styles.form}>
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input type="hidden" name="userType" value={userType} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
