"use client";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconifyIcon from "../../components/base/IconifyIcon";
import PasswordTextField from "../../components/common/PasswordTextField";
import Facebook from "../../components/icons/authentication/Facebook";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const checkBoxLabel = { inputProps: { "aria-label": "Checkbox" } };

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard"); //ไปที่หน้า welcome
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...", { position: "top-right" });
      const email = data.email;
      const password = data.password;
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((res) => {
        if (res.error) {
          toast.dismiss();
          toast.error(
            `${
              res.error === "Invalid email or password."
                ? res.error
                : "Please try again later."
            }`,
            {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              pauseOnHover: false,
            }
          );
          return;
        }
        // router.push("/dashboard"); //ไปที่หน้า welcome
        toast.dismiss();
        setTimeout(() => {
          toast.success("Login successful", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
          });
        }, 800);
      });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        pauseOnHover: false,
      });
    }
  };

  return (
    <section className="flex justify-center">
      <Box sx={{ width: { xs: 1, sm: 506 }, px: { xs: 2, sm: 0 }, py: 10 }}>
        <Typography variant="h1">Get&apos;s started.</Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color: "neutral.main",
            mt: 2,
            mb: 6.75,
          }}
        >
          Don’t have an account?{" "}
          <Typography
            variant="button"
            component={Link}
            href="/register"
            color="secondary"
          >
            Sign up
          </Typography>
        </Typography>

        <Stack gap={1.75} mb={3} direction={{ xs: "column", sm: "row" }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<IconifyIcon icon="flat-color-icons:google" />}
            sx={{ width: { sm: 1 / 2 }, py: 2.375, px: 4.375 }}
          >
            Sign in with Google
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<Facebook />}
            sx={{
              width: { sm: 1 / 2 },
              py: 2.25,
              px: 2.875,
              bgcolor: "primary.dark",
            }}
          >
            Sign in with Facebook
          </Button>
        </Stack>

        <Divider>or</Divider>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Paper
            sx={(theme) => ({
              padding: theme.spacing(2.5),
              my: 3,
              boxShadow: 1,
            })}
          >
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  fullWidth
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordTextField
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  fullWidth
                  {...register("password")}
                />
              </Grid>
            </Grid>
          </Paper>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3.75}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...checkBoxLabel}
                  sx={{
                    color: "neutral.light",
                  }}
                  icon={
                    <IconifyIcon icon="fluent:checkbox-unchecked-24-regular" />
                  }
                  checkedIcon={
                    <IconifyIcon icon="fluent:checkbox-checked-24-regular" />
                  }
                />
              }
              label={
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ color: "neutral.light" }}
                >
                  Remember me
                </Typography>
              }
            />

            <Typography
              variant="h6"
              component={Link}
              href="#!"
              color="secondary"
            >
              Forgot your password?
            </Typography>
          </Stack>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            sx={{ py: 2.25 }}
          >
            <Typography variant="h4" component="span">
              Sign in
            </Typography>
          </Button>
        </Box>
      </Box>
    </section>
  );
};

export default Login;
