import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserForm from "./UserForm";

interface PropTypes {
  open: boolean;
  handleClose: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddUserModal = ({ open, handleClose }: PropTypes) => {
  function handleSubmit(value: any) {
    console.log(value);
  }

  const initialValues = { firstName: "Test", lastName: "Name", email: "test@gmail.com", avatar: "" };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
          Add a new user
        </Typography>

        <UserForm onSubmit={handleSubmit} initialValues={initialValues} />
      </Box>
    </Modal>
  );
};

export default AddUserModal;
