import { useEffect } from "react";
import { Box } from "@mui/system";
import { Alert, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers, addUser } from "redux/users/userSlice";
import { modalStyle } from "./customStyles";
import { User } from "types/user";
import UserForm from "./UserForm";

interface PropTypes {
  open: boolean;
  handleClose: any;
}

const AddUserModal = ({ open, handleClose }: PropTypes) => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    if (users.createStatus === "success") {
      handleClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.createStatus]);

  function handleSubmit(value: any) {
    const { firstName, lastName, email, avatar } = value;

    const user: User = {
      id: (users.value?.total || 0) + 1,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    };

    dispatch(addUser(user));
  }

  const initialValues = { firstName: "", lastName: "", email: "", avatar: "" };

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
            Add a new user
          </Typography>

          <UserForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
            loading={Boolean(users.createStatus === "loading")}
          />

          {users.createStatus === "failed" && (
            <Alert sx={{ mt: 3 }} severity="error">
              Something went wrong
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
