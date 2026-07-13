import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validations/register.schema";
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

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      reset()
      toast.success("Registration successful!", {
        onClose: () => navigate("/login"),
      });

    } catch (error) {
       toast.error(
      error.response?.data?.message || "Registration failed"
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
            <Typography variant="h4" fontWeight="bold">
              Register
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Create your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                {/* Name */}

                <TextField
                  fullWidth
                  label="Full Name"
                  {...register("name",)}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Email */}

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", )}
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

                {/* Company */}

                <TextField
                  fullWidth
                  label="Company Name"
                  {...register("companyName", )}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon />
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
                  {...register("password", )}
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
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                            edge="end"
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
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Register
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}