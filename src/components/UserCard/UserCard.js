import React, { useState } from "react";

import SwitchButton from "../../components/SwitchButton/SwitchButton";
import UserCardAcceptPopup from "../Popups/UserCardAcceptPopup/UserCardAcceptPopup";
import UserCardRejectPopup from "../Popups/UserCardRejectPopup/UserCardRejectPopup";

//Images
import userProfileImage from "../../assets/JES-Admin-Portal-Assets-12.png";
import leftIcon from "../../assets/leftIcon.png";
import { toast } from "react-toastify";
import JESinstance from "../../api";

export default function UserCard({
  allUsersData,
  setRegisteredUserModal,
  all,
  getAllUsers,
}) {
  const [userCardAcceptPopup, setUserCardAcceptPopup] = useState(false);
  const [userCardRejectPopup, setUserCardRejectPopup] = useState(false);

  const handleCheckboxChange = async (data) => {
    console.log(data);
    const body = {
      status: data?.isActive === true ? false : true,
      id: data.id,
    };
    await JESinstance.post("updateUserStatus", body);
    const msg =
      body.status === true
        ? "User Activated Successfully"
        : "User Blocked Successfully";
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getAllUsers();
  };

  return (
    <>
      {allUsersData.map((userData) => (
        <div>
          {userCardAcceptPopup && (
            <UserCardAcceptPopup
              setUserCardAcceptPopup={setUserCardAcceptPopup}
            />
          )}
          {userCardRejectPopup && (
            <UserCardRejectPopup
              setUserCardRejectPopup={setUserCardRejectPopup}
            />
          )}

          <div className="userDetailCard dropShadow flex p-[10px] rounded-[20px] gap-[20px]">
            <div className="w-[20%]">
              <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center mb-[20px]">
                <img className="" src={userProfileImage} />
              </div>
            </div>
            <div className="userDetailContent w-[80%]">
              <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                <p>{userData.name}</p>
                <img
                  onClick={() => setRegisteredUserModal(true)}
                  className="h-[10px] mr-[10px] cursor-pointer"
                  src={leftIcon}
                />
              </div>
              <div className="userId text-[#777] text-[12px]">
                <p>{userData.phone}</p>
              </div>
              <div className="userEmail text-[#777] text-[12px]">
                <p>{userData.email}</p>
              </div>
              <div className="flex mt-[10px] justify-end">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={userData.isActive === true ? true : false}
                    onChange={() => handleCheckboxChange(userData)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
