import React from "react";
import { toast } from "react-toastify";
import reject from '../../../assets/remove.png'

export default function UserCardRejectPopup({setUserCardRejectPopup}) {

  const handleClick = () => {
    setUserCardRejectPopup(false)
    toast.success('Request Updated Successfully', {
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

  return (
    <div className="rejectPopup">
      <div className="rejectPopup_inner">
        <div className="flex justify-center items-center flex-col">
          <div className="mt-[10px]">
            <img className="w-[60px]" src={reject} />
          </div>
          <div className="mt-[10px] font-semibold text-[#777]">
            <p>Are You Sure Want to Reject?</p>
          </div>

          <div className="mt-[10px]">
            <button
              onClick={() => setUserCardRejectPopup(false)}
              className="nahi"
            >
              No
            </button>
            <button onClick={handleClick} className="ghalat">Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
