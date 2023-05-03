import React from "react";

export default function GlobalButton({ btnTitle }) {
  return (
    <div>
      <button className="globalButton bg-gradient-to-r from-[#b7ce31] to-[#1cb750] dropShadow px-[45px] py-[10px] text-white rounded-[7px] hover:bg-gradient-to-b hover:font-semibold">{btnTitle}</button>
    </div>
  );
}
