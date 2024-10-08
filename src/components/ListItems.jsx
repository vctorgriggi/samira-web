import { Fragment } from "react";
import LinkNext from "next/link";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArticleIcon from "@mui/icons-material/Article";
import { APP_ROUTES } from "@/constants/app-routes";
import GroupIcon from "@mui/icons-material/Group";
import Typography from "@mui/material/Typography";

export const mainListItems = (
  <Fragment>
    <ListItemButton
      title="Dashboard"
      component={LinkNext}
      to={APP_ROUTES.private.ap.dashboard}
    >
      <ListItemIcon>
        <DashboardIcon style={{ color: "var(--gray-400)" }} />
      </ListItemIcon>
      <Typography
        sx={{
          color: "var(--gray-400)",
          fontSize: "0.875rem",
          lineHeight: "2rem",
        }}
      >
        Dashboard
      </Typography>
    </ListItemButton>
  </Fragment>
);

export const secondaryListItems = (
  <Fragment>
    <ListSubheader component="div" inset sx={{ color: "var(--gray-400)" }}>
      Repertórios Salvos
    </ListSubheader>
    <ListItemButton
      title="Pedras"
      component={LinkNext}
      to={APP_ROUTES.private.ap.pedras}
    >
      <ListItemIcon>
        <ArticleIcon style={{ color: "var(--gray-400)" }} />
      </ListItemIcon>
      <Typography
        sx={{
          color: "var(--gray-400)",
          fontSize: "0.875rem",
          lineHeight: "2rem",
        }}
      >
        Pedras
      </Typography>
    </ListItemButton>
    <ListItemButton
      title="Categorias de pedras"
      component={LinkNext}
      to={APP_ROUTES.private.ap.categorias_de_pedras}
    >
      <ListItemIcon>
        <ArticleIcon style={{ color: "var(--gray-400)" }} />
      </ListItemIcon>
      <Typography
        sx={{
          color: "var(--gray-400)",
          fontSize: "0.875rem",
          lineHeight: "2rem",
        }}
      >
        Categorias de pedras
      </Typography>
    </ListItemButton>
  </Fragment>
);

export const tertiaryListItems = (
  <Fragment>
    <ListSubheader component="div" inset sx={{ color: "var(--gray-400)" }}>
      Acesso e Segurança
    </ListSubheader>
    <ListItemButton
      title="Usuários"
      component={LinkNext}
      to={APP_ROUTES.private.ap.usuarios}
    >
      <ListItemIcon>
        <GroupIcon style={{ color: "var(--gray-400)" }} />
      </ListItemIcon>
      <Typography
        sx={{
          color: "var(--gray-400)",
          fontSize: "0.875rem",
          lineHeight: "2rem",
        }}
      >
        Usuários
      </Typography>
    </ListItemButton>
  </Fragment>
);
