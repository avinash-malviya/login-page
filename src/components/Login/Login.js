import React from "react";
import './login.css';

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Login = () => {
  const [values, setValues] = React.useState({
    username: "",
    password:""
  });

  const handleChange = key => event => {
    setValues({ ...values, [key]: event.target.value });
  };
  const usernameRegex = new RegExp('^[a-zA-Z]+$');
  const passswordRegex = new RegExp('^[0-9a-zA-Z]+$');
  const userNameError = values.username == ""? false: !((values.username.length == 6) && (usernameRegex.test(values.username)));
  const passwordError = values.password == ""? false: !((values.password.length == 8) && (passswordRegex.test(values.password)));

  const handleSubmit = (e) => {
    // call login api here 
   e.preventDefault()
  }

  return (
    <Grid>
      <Paper elevation={10} className={"paperStyle"}
  >
        <Grid align="center">
          <Avatar className={"avatarStyle"}>
            <LockOutlinedIcon />
            </Avatar>
          <h2 className={"heading"}>User Login</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            inputProps={{"data-testid": "username-input"}}
            fullWidth
            required
            autoComplete="off"
            name="username"
            id="username"
            label="Username"
            InputLabelProps={{
              shrink: true,
            }}
            error={userNameError}
            variant="outlined"
            onChange={handleChange("username")}
            helperText={userNameError ? "Username can be of length 6 and contains only letters." : ""}
          />
          <br/>
          <br/>
          <TextField
            inputProps={{"data-testid": "password-input"}}
            type="password"
            id="password"
            name="password"
            fullWidth
            required
            name="password"
            label="Password"
            InputLabelProps={{
              shrink: true,
            }}
            error={passwordError}
            variant="outlined"
            onChange={handleChange("password")}
            helperText={passwordError ? "Password can be of length 8 and contains only alphanumeric letters." : ""}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            id="submit"
            data-testid="login-submit"
            type="submit"
            color="primary"
            variant="contained"
            className={"btnstyle"}
            fullWidth
          >
            Sign in
          </Button>
            <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;

