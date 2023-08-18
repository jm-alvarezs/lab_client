import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "@reach/router";

function ListItem({ label, icon, handle, selected, handleClick }) {
  return (
    <ListItemButton
      selected={selected === handle}
      onClick={(event) => handleClick(event, handle)}
    >
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

function SelectedListItem({ items }) {
  const location = useLocation();
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    handleLocation();
  }, [location]);

  const handleLocation = () => {
    let selected = "";
    const { pathname } = window.location;
    if (pathname.includes("settings")) {
      selected = "settings";
    } else if (pathname.includes("billing")) {
      selected = "billing";
    }
    setSelected(selected);
  };

  const handleListItemClick = (event, handle) => {
    setSelected(handle);
  };

  function renderItems() {
    if (Array.isArray(items)) {
      return items.map((item, index) => (
        <ListItem
          index={index}
          icon={item.icon}
          label={item.label}
          selected={selected}
          handleClick={handleListItemClick}
        />
      ));
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {renderItems()}
      </List>
    </Box>
  );
}

export default SelectedListItem;
