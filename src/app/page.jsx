"use client";

import { useRouter } from "next/navigation";
import LinkNext from "next/link";
import { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import CircularIndeterminate from "@/components/CircularIndeterminate";
import FeedbackSnackbar from "@/components/FeedbackSnackbar";
import BasicTextField from "@/components/BasicTextField";
import { APP_ROUTES } from "@/constants/app-routes";
import BasicButton from "@/components/button/Basic";
import { validateEmail } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();

  /* loading animation */
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  /* snackbar feedback */
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severitySnackbar, setSeveritySnackbar] = useState("warning");
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const handleOpenSnackbar = (props) => {
    setSeveritySnackbar(props.severity);
    setMessageSnackbar(props.message);
    setOpenSnackbar(true);
  };

  /* init form data */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  /* init form errors */
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {
      // object to store errors
    };

    if (!formData.email) {
      errors.email = "Email é obrigatório.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Formato de email inválido.";
    }
    if (!formData.password) errors.password = "Senha é obrigatória.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* submitting action */
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoadingAnimation(true);
      await login(formData);
      router.push(APP_ROUTES.private.ap.dashboard);
    } catch (error) {
      handleOpenSnackbar({
        severity: "error",
        message: error.message,
      });
    } finally {
      setIsLoadingAnimation(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1641831705160-5d56ac4094cb")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="div">
              <Box component="div" sx={{ width: "100%" }}>
                <Box component="div" sx={{ my: 2 }}>
                  <Avatar>
                    <LockIcon />
                  </Avatar>
                </Box>
                <Typography component="h1" variant="h6">
                  Fazer logon
                </Typography>
                <Typography variant="subtitle1">
                  Para sua proteção, verifique a sua identidade.
                </Typography>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <BasicTextField
                  required
                  autoFocus
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleFieldChange}
                  autoComplete="email"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
                <BasicTextField
                  required
                  id="password"
                  label="Senha"
                  name="password"
                  type="password"
                  onChange={handleFieldChange}
                  autoComplete="current-password"
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <BasicButton
                  type="submit"
                  fullWidth
                  disabled={isLoadingAnimation}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoadingAnimation && (
                    <CircularIndeterminate size={24} color="inherit" />
                  )}
                  {!isLoadingAnimation && "Sign In"}
                </BasicButton>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component={LinkNext}
                      href={APP_ROUTES.public.forgot_password}
                      variant="body2"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Grid>
                  {/* <Grid item>
                  <Link component={LinkNext} href="#" variant="body2">
                    Não tem uma conta? Cadastre-se
                  </Link>
                </Grid> */}
                </Grid>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 5 }}
                >
                  {"Não é o que você está procurando? "}
                  <Link
                    color="inherit"
                    target="_blank"
                    rel="noreferrer"
                    href="https://marmorariamacapa.com"
                  >
                    Volte para a página inicial
                  </Link>
                  {"."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <FeedbackSnackbar
          open={openSnackbar}
          severity={severitySnackbar}
          message={messageSnackbar}
          onClose={() => setOpenSnackbar(false)}
        />
      </Grid>
    </ThemeProvider>
  );
}
