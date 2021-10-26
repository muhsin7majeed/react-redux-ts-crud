import { useState } from "react";
import { Button } from "@material-ui/core";
import { Icon, Stack } from "@mui/material";

import { useDispatch } from "react-redux";
import { deleteUser } from "redux/users/userSlice";
import { User } from "types/user";
import EditUserModal from "./EditUserModal";
import DeleteUserPopup from "./DeleteUserPopup";

interface PropType {
  user: User;
}

const UserActions = ({ user }: PropType) => {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function handleDelete() {
    dispatch(deleteUser(user.id));
  }

  function toggleDeleteConfirm() {
    setDeleteOpen(!deleteOpen);
  }

  function toggleEditOpen() {
    setEditOpen(!editOpen);
  }

  return (
    <>
      <EditUserModal open={editOpen} handleClose={toggleEditOpen} user={user} />
      <DeleteUserPopup open={deleteOpen} toggle={toggleDeleteConfirm} user={user} confirm={handleDelete} />

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" endIcon={<Icon>edit</Icon>} onClick={toggleEditOpen}>
          Edit
        </Button>

        <Button variant="contained" color="secondary" endIcon={<Icon>delete</Icon>} onClick={toggleDeleteConfirm}>
          Delete
        </Button>
      </Stack>
    </>
  );
};

export default UserActions;
