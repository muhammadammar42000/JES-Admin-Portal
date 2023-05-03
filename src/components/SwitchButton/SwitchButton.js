import React from "react";
import { toast } from "react-toastify";

export default function SwitchButton() {
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
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
    } else {
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
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        // checked={elem.isActive === 1 ? false : true}
        onChange={handleCheckboxChange}
      />
      <span className="slider round"></span>
    </label>
  );
}
