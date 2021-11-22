/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layout from "../component/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classes = useStyles();
  const submitHandler = async ({
    firstname,
    lastName,
    otherName,
    email,
    password,
    confirmPassword,
    street,
    lga,
    nationality,
    city,
    zipCode,
    lgaOfOrigin,
    stateOfOrigin,
    maritalStatus,
    gender,
    phone,
  }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/user/register", {
        firstname,
        lastName,
        otherName,
        email,
        password,
        phone,
        gender,
        street,
        lga,
        city,
        zipCode,
        lgaOfOrigin,
        nationality,
        stateOfOrigin,
        maritalStatus,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        {
          variant: "error",
        }
      );
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstname"
                  label="First name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.firstname)}
                  helperText={
                    errors.firstname
                      ? errors.firstname.type === "minLength"
                        ? "First name lenght is more than 1"
                        : "First name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.lastName)}
                  helperText={
                    errors.lastName
                      ? errors.lastName.type === "minLength"
                        ? "Last name lenght is more than one"
                        : "Last name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="otherName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="otherName"
                  label="Other name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.otherName)}
                  helperText={
                    errors.otherName
                      ? errors.otherName.type === "minLength"
                        ? "Other name lenght is more than one"
                        : "Other name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  variant="outlined"
                  fullWidth
                  id="gender"
                  label="gender"
                  error={Boolean(errors.gender)}
                  {...field}
                >
                  <MenuItem disabled selected>
                    gender
                  </MenuItem>
                  <MenuItem value={"male"}>MALE</MenuItem>
                  <MenuItem value={"female"}>FEMALE</MenuItem>
                  <MenuItem value={"other"}>OTHER</MenuItem>
                </Select>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern:
                  /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone number"
                  inputProps={{ type: "number" }}
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === "pattern"
                        ? "Phone number is not valid"
                        : "Phone number is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="street"
                  label="Residential address"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.street)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="lga"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lga"
                  label="Local government area (RESIDENTIAL)"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.lga)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.city)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="zipCode"
                  label="Zip code"
                  inputProps={{ type: "number" }}
                  error={Boolean(errors.street)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="nationality"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nationality"
                  label="Nationality"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.nationality)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="stateOfOrigin"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="stateOfOrigin"
                  label="State of origin"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.stateOfOrigin)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="lgaOfOrigin"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lgaOfOrigin"
                  label="Local Government Area"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.lgaOfOrigin)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="maritalStatus"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  variant="outlined"
                  fullWidth
                  id="maritalStatus"
                  label="Marital Status"
                  error={Boolean(errors.maritalStatus)}
                  {...field}
                >
                  <MenuItem disabled selected>
                    MARITAL STATUS
                  </MenuItem>
                  <MenuItem value={"single"}>SINGLE</MenuItem>
                  <MenuItem value={"married"}>MARRIED</MenuItem>
                  <MenuItem value={"divorced"}>DIVORCED</MenuItem>
                </Select>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
