import { Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface PropType {
  open: boolean;
}

const UserActions = ({ open }: PropType) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Edit" />

          <ListItemIcon>
            <Icon>edit</Icon>
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Delete" />

          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Collapse>
  );
};

export default UserActions;
