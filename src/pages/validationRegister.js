import { object, string } from "yup";

const validationSchema = object({
  name: string()
    .required("Name is Required")
    .min(3, "Name must be at least 3 character"),
  email: string().required("Email is Required").email("Email is Invalid!"),
  password: string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 character"),
});

export default validationSchema;
