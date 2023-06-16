import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const pathNavbar = [
  {
    path: "/",
    text: "Прийом",
    id: 1,
  },
  { path: "/repair", text: "Ремонт", id: 2 },
  { path: "/telephones", text: "Телефони", id: 3 },
  { path: "/spareParts", text: "Запчастини", id: 4 },
  { path: "Accounting", text: "Бухгалтерія", id: 5 },
  { path: "/history", text: "Історія", id: 6 },
];

export default function NavbarMobile() {
  const [state, setState] = React.useState(
    // top: false,
    // left: false,
    false
    // right: false,
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pathNavbar.map(({ path, text, id }) => (
          <ListItem key={id} disablePadding>
            <NavLink style={{ width: "100%" }} to={path}>
              {text}
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>{"bottom"}</Button>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
