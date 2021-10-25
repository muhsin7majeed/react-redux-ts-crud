import * as YUP from "yup";

const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

export const userSchema = YUP.object().shape({
  firstName: YUP.string().max(50, "Too long").required("First name is Required"),
  lastName: YUP.string().max(50, "Too long").required("Last name is Required"),
  email: YUP.string().email("Enter a valid email").required("Email is Required"),
  avatar: YUP.mixed()
    .optional()
    .test("fileFormat", "Select a valid image file", (value: any) => {
      return value?.type ? SUPPORTED_IMAGE_FORMATS.includes(value.type) : true;
    }),
});
