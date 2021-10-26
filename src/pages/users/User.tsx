import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";

import { User as UserType } from "types/user";
import userImage from "assets/images/profile.jpg";
import UserActions from "./UserActions";

interface PropType {
  user: UserType;
  key: number;
}

const User = ({ user: u }: PropType) => {
  return (
    <>
      <ListItem alignItems="flex-start" key={u.id}>
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

        <UserActions user={u} />
      </ListItem>
    </>
  );
};

export default User;
