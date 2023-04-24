import React from "react";
import { useFormik } from "formik";
import validationSchema from "./validationLogin";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit: (values) => {
        let email = values.email
        let password = values.password
        console.log(email,password);
        axios
          .post("http://localhost:5000/api/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("user", JSON.stringify(res.data.user) );
            navigate("/");
          })
          .catch((err) => {
            alert(err.response.data.message)
          });
      },
      validationSchema,
    });
  return (
    <div className="min-h-1/2 flex flex-col justify-center items-center gap-9">
      <h1 className="text-[40px] font-extrabold tracking-[2px]">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 gap-3  w-1/3">
        <label htmlFor="email">Email Address</label>
        <input
          className="text-[24px] py-1 px-2 rounded border-2 border-slate-900 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-400/50 outline-none"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
          autoFocus
        />
        {errors.email && touched.email && (
          <div className="text-red-600">{errors.email}</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          className="text-[24px] py-1 px-2 rounded border-2 border-slate-900 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-400/50 outline-none"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <div className="text-red-600">{errors.password}</div>
        )}
        <button
          type="submit"
          className="text-white bg-green-500 font-bold py-2 px-4 mt-5 tracking-[2px] hover:bg-white hover:text-green-500"
        >
          Login
        </button>
      </form>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}

export default Login;
