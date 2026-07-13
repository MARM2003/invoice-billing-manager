import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth"
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  // hide/show password
  const [showPassword, setShowPassword] = useState(false);
  //success login creating context
  const { login } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      reset()
      // login(result)
      login({
        user: result.data.user,
        accessToken: result.data.accessToken,
      });
      toast.success("Login successful!", {
        onClose: () => navigate("/"),
      });

    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={5}
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
            >
              Welcome Back
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              mb={4}
            >
              Login to your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                {/* Email */}

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Password */}

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 18,
                      message: "Password cannot exceed 18 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}