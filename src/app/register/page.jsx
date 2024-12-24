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
import { useRouter } from "next/navigation";
import { signup } from "@/functions/register";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const checkBoxLabel = { inputProps: { "aria-label": "Checkbox" } };

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    toast.loading("Please wait...", { position: "top-right" });
    await signup(data)
      .then((res) => {
        console.log(res.data.message);
        toast.dismiss();
        Swal.fire({
          title: "Successfuly!",
          text: "Your user has been created.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
            reset();
          }
        });
      })
      .catch((err) => {
        toast.dismiss();
        Swal.fire({
          title: "Something Wrong!",
          text: `${err.response.data.message}`,
          icon: "error",
        });
        reset();
      });
  };

  return (
    <section className="flex justify-center static lg:relative">
      <Box
        className="relative lg:static"
        sx={{ width: { xs: 1, sm: 506 }, px: { xs: 2, sm: 0 }, py: 10 }}
      >
        <div className="absolute top-6 left-0 ssm:-left-2 lg:left-[16rem]">
          <Link href={"/login"}>
            <button
              class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
              title="Go Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                class="stroke-blue-300"
              >
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M11 6L5 12M5 12L11 18M5 12H19"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
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
          Do you have an account?{" "}
          <Typography
            variant="button"
            component={Link}
            href="/login"
            color="secondary"
          >
            Sign in
          </Typography>
        </Typography>

        <Stack gap={1.75} mb={3} direction={{ xs: "column", sm: "row" }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<IconifyIcon icon="flat-color-icons:google" />}
            sx={{
              width: { sm: 1 / 2 },
              py: 2.375,
              px: 4.375,
              color: "neutral.dark",
            }}
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
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <TextField
                  fullWidth
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  {...register("firstName")}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <TextField
                  fullWidth
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  {...register("lastName")}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordTextField
                  fullWidth
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
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
              Sign up
            </Typography>
          </Button>
        </Box>
      </Box>
    </section>
  );
};

export default Signup;
