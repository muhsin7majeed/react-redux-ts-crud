import { useEffect } from "react";
import { Box } from "@mui/system";
import { Alert, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers, updateUser } from "redux/users/userSlice";
import { modalStyle } from "./customStyles";
import { User } from "types/user";
import UserForm from "./UserForm";

interface PropTypes {
  open: boolean;
  handleClose: any;
  user: User;
}

const EditUserModal = ({ open, handleClose, user }: PropTypes) => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    if (users.updateStatus === "success") {
      handleClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.updateStatus]);

  function handleSubmit(value: any) {
    const { firstName, lastName, email, avatar } = value;

    const userValue: User = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    };

    dispatch(updateUser(userValue));
  }

  const initialValues = { firstName: user.first_name, lastName: user.last_name, email: user.email, avatar: "" };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Update user {user.first_name} {user.last_name}
          </Typography>

          <UserForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
            loading={Boolean(users.updateStatus === "loading")}
          />

          {users.updateStatus === "failed" && (
            <Alert sx={{ mt: 3 }} severity="error">
              Something went wrong
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditUserModal;
