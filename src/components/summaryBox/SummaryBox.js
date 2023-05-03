import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import JESinstance from "../../api/index";

export default function SummaryBox() {
  const [summaryBoxStats, setSummaryBoxStats] = useState([]);

  const getStats = async () => {
    const res = await JESinstance.post("getCount");
    setSummaryBoxStats(res.data.data);
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="fourBoxes pl-[100px] pr-[60px] mt-10">
      <div className="box box1 p-[30px]">
        <div className="upDesc flex justify-between">
          <p className="text-[#1AB650] text-[20px]">Total Event</p>
          <p className="text-[30px] text-[#BACE30]">
            {summaryBoxStats?.getTotalEvent}
          </p>
        </div>
        {/* <div className="downDesc flex justify-between mt-10">
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-[#046A3A]">Active</p>
            <p className="font-semibold text-[#046A3A]">
              {summaryBoxStats?.getActiveEvent}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-[#faac53]">Inactive</p>
            <p className="font-semibold text-[#faac53]">
              {summaryBoxStats?.getInActiveEvent}
            </p>
          </div>
        </div> */}
      </div>
      <div className="box box2 p-[30px] flex justify-between">
        <p className="text-[#1AB650] text-[20px] flex">Total Location</p>
        <p className="text-[30px] text-[#BACE30]">
          {summaryBoxStats.locationCount}
        </p>
      </div>
      <div className="box box3 p-[30px] flex justify-between">
        <p className="text-[#1AB650] text-[20px]">
          Reports / <br /> Suggestions
        </p>
        <p className="text-[30px] text-[#BACE30]">
          {summaryBoxStats.reportCount}
        </p>
      </div>
      <div className="box box4 p-[30px] flex justify-between">
        <p className="text-[#1AB650] text-[20px]">Total User</p>
        <p className="text-[30px] text-[#BACE30]">
          {summaryBoxStats.userCount}
        </p>
      </div>
    </div>
  );
}
