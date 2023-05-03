// import { useState } from "react";
// import LoginForm from "../../components/Popups/LoginForm/LoginForm";

// export default function Login() {
//   const [loginFormPopup, setLoginFormPopup] = useState(true);
//   return (
//     <div className="login login_active">
//       <button onClick={() => setLoginFormPopup(true)}>GET STARTED</button>
//       { <LoginForm />}
//     </div>
//   );
// }

import React, { useState } from "react";
import GlobalButton from "../../components/globalButton/GlobalButton";
import LoginForm from "../../components/Popups/LoginForm/LoginForm";

import logo from "../../assets/MJC-01.png";

const Login = () => {
  const [loginFormPopup, setLoginFormPopup] = useState(false);
  return (
    <div className="getStartedPage">
      {loginFormPopup && <LoginForm />}
      <div className="getStartedPage_box">
        <img className="w-[150px] mb-[20px]" src={logo} />
        <h1>WELCOME TO MJC</h1>
        <h1>ADMIN DASHBOARD</h1>
        <div
          className="getStartedPage_button"
          onClick={() => setLoginFormPopup(true)}
        >
          <GlobalButton btnTitle={"GET STARTED"} />
        </div>
      </div>
    </div>
  );
};

export default Login;
