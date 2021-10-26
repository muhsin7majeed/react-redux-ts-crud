import { Button, DialogContentText } from "@material-ui/core";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";

import { selectUsers } from "redux/users/userSlice";
import { User } from "types/user";

interface PropTypes {
  open: boolean;
  toggle: any;
  user: User;
  confirm: any;
}

const DeleteUserPopup = ({ open, toggle, user, confirm }: PropTypes) => {
  const users = useSelector(selectUsers);

  return (
    <Dialog open={open} onClose={toggle}>
      <DialogTitle>Delete user</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user {user.first_name} {user.last_name} ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={toggle}>
          Cancel
        </Button>

        <Button onClick={confirm}>
          {users.deleteStatus === "loading" ? <CircularProgress size={24} color="inherit" /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserPopup;
