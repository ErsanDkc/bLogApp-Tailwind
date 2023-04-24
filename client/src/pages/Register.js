import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validationSchema from "./validationRegister";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  // const navigate = useNavigate()
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState();

  // const register = async(e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("password", password);
  //   formData.append("avatar", avatar, avatar.name);

  //   await axios.post("http://localhost:5000/new", formData).then((res) => {
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));
  //     navigate("/");
  //   });
  //   navigate("/");
  // };
  const navigate = useNavigate();
  const [avatar,setAvatar] = useState()
  const { handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",

      },

      onSubmit: (values) => {
        const formData = new FormData();
        formData.append("name",values.name)
        formData.append("email",values.email)
        formData.append("password",values.password)
        formData.append("avatar",avatar,avatar.name)

        // api isteği
        axios.post("http://localhost:5000/api/register", formData)
        .then(res =>  {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user",JSON.stringify(res.data.user))
          navigate("/")
        })
        navigate("/");
      },
      validationSchema,
    });
  return (
    // <div
    //   className="d-flex justify-content-center"
    //   style={{ marginTop: "170px" }}
    // >
    //   <div className="col-md-4">
    //     <div className="card">
    //       <div className="card-header">
    //         <h1>Kayıt Ol</h1>
    //       </div>
    //       <div className="card-body">
    //         <form autoComplete="off" onSubmit={register}>
    //           <div className="form-group">
    //             <label htmlFor="name">Ad Soyad</label>
    //             <input
    //               className="form-control"
    //               name="name"
    //               id="name"
    //               required
    //               minLength="3"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="name">Email</label>
    //             <input
    //               className="form-control"
    //               name="email"
    //               id="email"
    //               required
    //               minLength="3"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //           </div>

    //           <div className="form-group mt-2">
    //             <label htmlFor="password">Şifre</label>
    //             <input
    //               className="form-control"
    //               name="password"
    //               id="password"
    //               type="password"
    //               required
    //               minLength="1"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //           </div>
    //           <div className="form-group mt-2">
    //             <label htmlFor="image">Avatar</label>
    //             <input
    //               type="file"
    //               className="form-control"
                  
                  
    //               onChange={(e) => setAvatar(e.target.files[0])}
    //             />
    //           </div>

    //           <div className="form-group mt-2">
    //             <button
    //               type="submit"
    //               id="loginBtn"
    //               className="btn btn-outline-success w-100"
    //             >
    //               Kayıt Ol
    //             </button>
    //             <Link to="/login" className="mt-1" style={{ float: "right" }}>
    //               Giriş Sayfası
    //             </Link>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-1/2 flex flex-col justify-center items-center gap-9">
      <h1 className="text-[40px] font-extrabold tracking-[2px]">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 gap-3  w-1/3">
        <label htmlFor="email">Name</label>
        <input
          className="text-[24px] py-1 px-2 rounded border-2 border-slate-900 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-400/50 outline-none"
          id="name"
          name="name"
          type="name"
          onChange={handleChange}
          value={values.name}

          autoFocus
        />
        {errors && touched && <div className="text-red-600">{errors.name}</div>}
        <label htmlFor="email">Email Address</label>
        <input
          className="text-[24px] py-1 px-2 rounded border-2 border-slate-900 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-400/50 outline-none"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}

        />
        {errors && touched && (
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

        />
        {errors && touched && (
          <div className="text-red-600">{errors.password}</div>
        )}
        <label htmlFor="avatar">Avatar</label>
        <input
          className="text-[24px] py-1 px-2 rounded border-2 border-slate-900 focus:border-sky-400 focus:shadow-lg focus:shadow-sky-400/50 outline-none"
          id="avatar"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}

        />
        <button
          type="submit"
          className="text-white bg-green-500 font-bold py-2 px-4 mt-5 tracking-[2px] hover:bg-white hover:text-green-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
