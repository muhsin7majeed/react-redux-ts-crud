import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListItemButton, Icon } from "@mui/material";

import { User as UserType } from "types/user";
import userImage from "assets/images/profile.jpg";
import { useState } from "react";
import UserActions from "./UserActions";

interface PropType {
  user: UserType;
  key: number;
}

const User = ({ user: u }: PropType) => {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <ListItem alignItems="flex-start" key={u.id}>
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <Avatar alt={`${u.first_name} ${u.last_name}`} src={u.avatar || userImage} />
          </ListItemAvatar>

          <ListItemText
            primary={`${u.first_name} ${u.last_name}`}
            secondary={
              <>
                <Typography sx={{ display: "inline" }} component="span" variant="body2">
                  {u.email}
                </Typography>
              </>
            }
          />

          {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
        </ListItemButton>
      </ListItem>

      <UserActions open={open} />
    </>
  );
};

export default User;
