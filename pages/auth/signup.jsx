import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  NativeSelect,
  FormHelperText,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import axios from "axios";
import NextRouter from "next/router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle signup logic here

    const userData = {
      name: firstName,
      email: email,
      password: password,
      mobile: mobile,
      role: role,
    };
    try {
      const response = await axios.post("/api/signup", userData);

      console.log("Signup successful");
      NextRouter.push("/auth/login");
    } catch (error) {
      console.log(error.message);
      console.log("Signup failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <FormControl fullWidth>
          <NativeSelect
            value={role}
            onChange={(e) => setRole(e.target.value)}
            inputProps={{
              name: "role",
              id: "role-native-helper",
            }}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="advertiser">Advertiser</option>
          </NativeSelect>
          <FormHelperText>Role</FormHelperText>
        </FormControl>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                autoComplete="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I agree to the terms and conditions."
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

//mui dropdown to select role in signup
/*
<FormControl fullWidth>

<NativeSelect
  value={role}
  onChange={(e) => setRole(e.target.value)}
  inputProps={{
    name: "role",
    id: "role-native-helper",
  }}
>
  <option value="buyer">Buyer</option>
  <option value="seller">Seller</option>
</NativeSelect>
<FormHelperText>Role</FormHelperText>
</FormControl>

*/
