import React from "react";
import { toast } from "react-toastify";
import accept from "../../../assets/accept.png";

export default function UserCardAcceptPopup({ msg, setUserCardAcceptPopup }) {
  const handleClick = () => {
    setUserCardAcceptPopup(false);

    toast.success("Request Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="AcceptPopup">
      <div className="AcceptPopup_inner">
        <div className="flex justify-center items-center flex-col">
          <div className="mt-[10px]">
            <img className="w-[60px]" src={accept} />
          </div>
          <div className="mt-[10px] font-semibold text-[#777]">
            <p>Are You Sure Want to Accept?</p>
          </div>

          <div className="mt-[10px]">
            <button
              onClick={() => setUserCardAcceptPopup(false)}
              className="nahi"
            >
              No
            </button>
            <button onClick={handleClick} className="theekhai">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
