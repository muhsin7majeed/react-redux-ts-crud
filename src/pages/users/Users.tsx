import { useEffect, useState } from "react";
import { Button, Icon, LinearProgress, List, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, selectUsers } from "redux/users/userSlice";
import User from "./User";
import { Box } from "@mui/system";
import AddUserModal from "./AddUserModal";

const Users = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers(page));
  }, [dispatch, page]);

  function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  function handleAddOpen() {
    setAddOpen(!addOpen);
  }

  return (
    <div>
      <AddUserModal open={addOpen} handleClose={handleAddOpen} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users </h1>

        <Button variant="contained" endIcon={<Icon>add</Icon>} onClick={handleAddOpen}>
          Add
        </Button>
      </Box>

      {users.value && (
        <>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {users.value.data.map((u) => (
              <User key={u.id} user={u} />
            ))}
          </List>

          <Pagination count={users.value.total_pages} onChange={handlePageChange} />

          {users.status === "loading" && <LinearProgress />}
        </>
      )}
    </div>
  );
};

export default Users;
