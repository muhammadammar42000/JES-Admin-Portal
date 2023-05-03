import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Email from "../../../assets/Web-Assets-16.png";
import Password from "../../../assets/Web-Assets-17.png";
import leaves from "../../../assets/Web-Assets-13.png";
import showPassIcon from "../../../assets/eye.png";
import hidePassIcon from "../../../assets/hidden.png";
import JESinstance from "../../../api/index";

import React from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const body = {
      email: email,
      password: pass,
    };

    if (email === "" || pass === "") {
      toast.error("Please Enter Correct Credentials", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // navigate("/");
    } else {
      try {
        const res = await JESinstance.post("login", body);
        console.log(res?.data?.message);
        if (res?.data?.message === "Wrong Email") {
          toast.error("Wrong Email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res?.data?.message === "Wrong Password") {
          toast.error("Wrong Password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        // console.log(res?.data?.message);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("isLogged", "true");
        window.location.reload();

        toast.success("Successfully Logged In", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    // if (email === "admin@gmail.com" && pass === "admin123") {
    //   localStorage.setItem('isLogged', "true");
    //   window.location.reload();

    //   toast.success("Successfully Logged In", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // navigate("/");
    // } else {
    //   toast.error("Please Enter Correct Credentials", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  return (
    <div className="loginPopup">
      <div className="loginPopup_inner">
        <div className="loginPopup_leaves">
          <img src={leaves} />
        </div>
        <p className="loginPopup_title">Welcome Admin!</p>
        <i className="fas fa-mail"></i>
        <div className="loginPopup_inputSection">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src={Email} />
        </div>
        {err === "email" && (
          <p className="loginPopup_err">Email is not valid</p>
        )}
        <div className="loginPopup_inputSection">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
          <img src={Password} className="pass" />
          <div className="showPassword" onClick={() => setShowPass(!showPass)}>
            <img
              className="cursor-pointer"
              src={showPass ? hidePassIcon : showPassIcon}
            />
          </div>
        </div>

        {err === "pass" && (
          <p className="loginPopup_err">
            Password must be atleast 6 characters
          </p>
        )}
        {err === "Please Wait" && <p className="loginPopup_err">Please Wait</p>}
        {err === "invalid" && (
          <p className="loginPopup_err">Invalid Username or Password</p>
        )}
        <a
          className="loginPopup_submit loginPopup_btn"
          href="#"
          id="helpcrunchLogin"
          onClick={handleSubmit}
        >
          LOGIN
        </a>
      </div>
    </div>
  );
}
