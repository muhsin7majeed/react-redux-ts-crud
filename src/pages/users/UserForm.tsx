import { ErrorMessage, Form, Formik } from "formik";
import { Avatar, Badge, Button, FormHelperText, Icon, IconButton, Input, TextField } from "@mui/material";

import { userSchema } from "helpers/validators/user.validator";
import userImage from "assets/images/profile.jpg";

interface PropTypes {
  initialValues: any;
  onSubmit: any;
}

const UserForm = ({ initialValues, onSubmit }: PropTypes) => {
  return (
    <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
      {({ errors, values, handleChange, setFieldValue, setFieldTouched }) => (
        <Form className="form">
          <Badge
            style={{ marginBottom: 20 }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <label htmlFor="icon-button-file">
                <Input
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  name="avatar"
                  onChange={({ currentTarget }: any) => {
                    setFieldTouched("avatar");
                    setFieldValue("avatar", currentTarget.files[0]);
                  }}
                />

                <IconButton color="primary" aria-label="upload picture" component="span">
                  <Icon>photo_camera</Icon>
                </IconButton>
              </label>
            }
          >
            <Avatar
              src={values.avatar ? URL.createObjectURL(values.avatar) : userImage}
              sx={{ width: 80, height: 80 }}
            />
          </Badge>

          <FormHelperText error style={{ marginBottom: 20 }}>
            <ErrorMessage name="avatar" />
          </FormHelperText>

          <TextField
            label="First Name"
            name="firstName"
            sx={{ mb: 3, width: "100%" }}
            value={values.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={<ErrorMessage name="firstName" />}
          />
          <TextField
            label="Last Name"
            name="lastName"
            sx={{ mb: 3, width: "100%" }}
            value={values.lastName}
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={<ErrorMessage name="lastName" />}
          />
          <TextField
            label="Email Id"
            name="email"
            sx={{ mb: 3, width: "100%" }}
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={<ErrorMessage name="email" />}
          />

          <Button type="submit" variant="contained" endIcon={<Icon>send</Icon>}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
