import { object, string } from 'yup';

const validationSchema = object({
  email: string().required("Email is Required").email("Email is Invalid!"),
  password: string().required("Password is Required").min(6,"Password must be at least 6 character"),
  
});

export default validationSchema;